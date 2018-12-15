import * as React from "react";
import io from "socket.io-client";

export interface IHomeProps {
  readonly username: string;
}

export interface IHomeState {
  readonly message: string;
  readonly socket: SocketIOClient.Socket;
}

export class Home extends React.Component<IHomeProps> {
  public state: IHomeState;

  constructor(props: IHomeProps) {
    super(props);
    this.state = { message: "", socket: io("http://localhost:3001") };
  }

  handleChange = (e: any) => {
    this.setState({ message: e.currentTarget.value });
  };

  handleSend = () => {
    console.log("Sending message: ", this.state.message);
    this.state.socket.emit("chat message", this.state.message);
  };

  render() {
    return (
      <div>
        <div>{`Welcome ${
          this.props.username
        }! Waiting on the next available user`}</div>
        <input
          type="text"
          placeholder="Message..."
          onChange={this.handleChange}
          value={this.state.message}
        />
        <button onClick={this.handleSend}>Send</button>
      </div>
    );
  }
}
