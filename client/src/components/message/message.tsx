import * as React from "react";
import { IChatMessage } from "../home/home";
import "./message.css";

export interface IMessageProps {
  readonly message: IChatMessage;
}

export class Message extends React.Component<IMessageProps> {
  render() {
    const { time, user, body } = this.props.message;

    return (
      <div className="message-item">
        <div>{`Time: ${time}`}</div>
        <div>{user}</div>
        <div>{body}</div>
      </div>
    );
  }
}
