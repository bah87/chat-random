import * as React from "react";
import io from "socket.io-client";
import moment from "moment";
import {
  IChatMessage,
  SocketEventsEnum,
  IRequestRandomChatResponse,
  PairingStatusEnum
} from "../../types";
import { ChatLoading, IChatLoadingProps } from "../chat-loading/chat-loading";
import { Chat } from "../chat/chat";
import { ChatSideBar } from "../chat-sidebar/chat-sidebar";
import "./home.css";

export const PAIRING_DELAY = 2000;

export interface IHomeProps {
  readonly username: string;
}

export interface IHomeState extends IChatLoadingProps {
  readonly socket: SocketIOClient.Socket;
  readonly chat: IChatMessage[];
  readonly chatId?: string;
}

export class Home extends React.Component<IHomeProps> {
  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      socket: io("http://localhost:3001"),
      chat: [],
      pairingStatus: PairingStatusEnum.Unpaired
    };
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
    const { chat, pairedUser, pairingStatus } = this.state;

    return pairingStatus === PairingStatusEnum.Paired ? (
      <div className="home-container">
        <ChatSideBar currentUser={username} />
        <Chat
          pairedUser={pairedUser}
          messages={chat}
          onSubmit={this.handleSend}
        />
      </div>
    ) : (
      <ChatLoading pairingStatus={pairingStatus} pairedUser={pairedUser} />
    );
  }

  private handleNewChat = (response: IRequestRandomChatResponse) => {
    console.log("Receiving new chat response from server", response);
    const { chatId, participants } = response;

    const pairedUser =
      participants &&
      participants.filter(user => user !== this.props.username)[0];

    const newState = { chatId, pairedUser };
    if (pairedUser) {
      this.setState({ pairingStatus: PairingStatusEnum.Pairing });
      setTimeout(
        () => this.setState({ pairingStatus: PairingStatusEnum.Paired }),
        PAIRING_DELAY
      );
    } else {
      this.setState({ pairingStatus: PairingStatusEnum.Unpaired });
    }

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
