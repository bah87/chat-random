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
  readonly subject?: string;
  readonly time?: string;
}

export interface IHomeProps {
  readonly username: string;
}

export interface IHomeState {
  readonly socket: SocketIOClient.Socket;
  readonly chat: IChatMessage[];
}

export class Home extends React.Component<IHomeProps> {
  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = { socket: io("http://localhost:3001"), chat: [] };
    this.state.socket.on("chat message", this.handleResponse);
  }

  handleResponse = (response: IChatMessage) => {
    const chat = this.state.chat;
    chat.push({
      ...response,
      time: moment(response.time).format("MMMM Do YYYY, h:mm:ss a")
    });
    this.setState({ chat });
  };

  handleSend = (message: string) => {
    const { socket } = this.state;
    const { username } = this.props;
    console.log("Sending message from client: ", message);
    socket.emit("chat message", { body: message, user: username });
  };

  render() {
    const { username } = this.props;
    const { chat } = this.state;

    return (
      <div className="home-container">
        <ChatSideBar currentUser={username} />
        <Chat
          currentUser={username}
          messages={chat}
          onSubmit={this.handleSend}
        />
      </div>
    );
  }
}
