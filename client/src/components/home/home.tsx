import * as React from "react";
import io from "socket.io-client";
import moment from "moment";

import { Chat } from "../chat/chat";

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
  readonly message: string;
  readonly socket: SocketIOClient.Socket;
  readonly chat: IChatMessage[];
}

export class Home extends React.Component<IHomeProps> {
  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = { message: "", socket: io("http://localhost:3001"), chat: [] };
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

  handleChange = (e: any) => {
    this.setState({ message: e.currentTarget.value });
  };

  handleSend = () => {
    const { socket, message } = this.state;
    const { username } = this.props;
    console.log("Sending message: ", message);
    this.setState({ message: "" });
    socket.emit("chat message", { body: message, user: username });
  };

  render() {
    const { username } = this.props;
    const { chat, message } = this.state;

    return (
      <div>
        <div>{`Welcome ${username}!`}</div>
        <input
          type="text"
          placeholder="Message..."
          onChange={this.handleChange}
          value={message}
        />
        <button onClick={this.handleSend}>Send</button>
        {!!chat.length && <Chat currentUser={username} messages={chat} />}
      </div>
    );
  }
}
