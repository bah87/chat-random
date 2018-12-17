import * as React from "react";
import io from "socket.io-client";
import moment from "moment";
import { Chat } from "../chat/chat";
import { ChatSideBar } from "../chat-sidebar/chat-sidebar";
import "./home.css";

export interface IChatMessage {
  readonly id?: string;
  readonly body: string;
  readonly user: string;
  readonly time?: string;
}

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

export interface INewMessage {
  readonly chatId: string;
  readonly author: string;
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
    this.state.socket.on(SocketEventsEnum.NewMessage, this.handleResponse);
    this.state.socket.emit(SocketEventsEnum.RegisterUser, props.username);
    this.state.socket.emit(SocketEventsEnum.RequestRandomChat, props.username);
    this.state.socket.on(SocketEventsEnum.RequestRandomChat, this.addChat);
  }

  addChat = (response: IRequestRandomChatResponse) => {
    console.log("addChat", response);
    const { chatId, participants } = response;

    const pairedUser =
      participants &&
      participants.filter(user => user !== this.props.username)[0];

    const newState = pairedUser ? { chatId, pairedUser } : { chatId };

    this.setState(newState);
  };

  handleResponse = (response: INewMessage) => {
    console.log("handleResponse", response);
    // const chat = this.state.chat;
    // chat.push({
    //   ...response,
    //   time: moment(response.time).format("h:mm a")
    // });
    // this.setState({ chat });
  };

  handleSend = (body: string) => {
    const { socket, chatId } = this.state;
    const { username: author } = this.props;
    const message = { chatId, body, author };
    console.log("Sending message from client: ", message);
    socket.emit(SocketEventsEnum.NewMessage, message);
  };

  render() {
    const { username } = this.props;
    const { chat } = this.state;

    return (
      <div className="home-container">
        <ChatSideBar currentUser={username} />
        <Chat messages={chat} onSubmit={this.handleSend} />
      </div>
    );
  }
}
