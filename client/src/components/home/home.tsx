import * as React from "react";
import io from "socket.io-client";
import moment from "moment";
import { Chat } from "../chat/chat";
import { ChatSideBar } from "../chat-sidebar/chat-sidebar";
import "./home.css";

export interface IHomeProps {
  readonly username: string;
}

export interface IHomeState {
  readonly socket: SocketIOClient.Socket;
  readonly chat: IChatMessage[];
  readonly chatId?: string;
  readonly pairedUser?: string;
}

export interface IRequestRandomChatResponse {
  readonly chatId: string;
  readonly participants: string[];
}

export interface IBaseMessage {
  readonly _id: string;
  readonly author: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IChatMessage extends IBaseMessage {
  readonly chatId: string;
  readonly body: string;
}

export enum SocketEventsEnum {
  RegisterUser = "register user",
  RequestRandomChat = "request random chat",
  NewMessage = "new message"
}

export class Home extends React.Component<IHomeProps> {
  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = { socket: io("http://localhost:3001"), chat: [] };
  }

  componentDidMount() {
    // Add socket event listeners
    this.state.socket.on(SocketEventsEnum.NewMessage, this.handleNewMessage);
    this.state.socket.on(
      SocketEventsEnum.RequestRandomChat,
      this.handleNewChat
    );

    // Register user
    this.state.socket.emit(SocketEventsEnum.RegisterUser, this.props.username);

    // Request random chat
    this.state.socket.emit(
      SocketEventsEnum.RequestRandomChat,
      this.props.username
    );
  }

  render() {
    const { username } = this.props;
    const { chat, pairedUser } = this.state;

    return (
      <div className="home-container">
        <ChatSideBar currentUser={username} />
        <Chat
          pairedUser={pairedUser}
          messages={chat}
          onSubmit={this.handleSend}
        />
      </div>
    );
  }

  private handleNewChat = (response: IRequestRandomChatResponse) => {
    console.log("Receiving new chat response from server", response);
    const { chatId, participants } = response;

    const pairedUser =
      participants &&
      participants.filter(user => user !== this.props.username)[0];

    const newState = pairedUser ? { chatId, pairedUser } : { chatId };

    this.setState(newState);
  };

  private handleNewMessage = (response: IChatMessage) => {
    console.log("Receiving message from server", response);
    const chat = this.state.chat;
    chat.push({
      ...response,
      createdAt: moment(response.createdAt).format("h:mm a"),
      updatedAt: moment(response.updatedAt).format("h:mm a")
    });
    this.setState({ chat });
  };

  private handleSend = (body: string) => {
    const { socket, chatId } = this.state;
    const { username: author } = this.props;
    const message = { chatId, body, author };
    console.log("Sending message from client: ", message);
    socket.emit(SocketEventsEnum.NewMessage, message);
  };
}
