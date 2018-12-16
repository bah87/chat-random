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
      <div className="message-container">
        <div className="message-user">{user}</div>
        <div className="message-item">
          {body}
          {/* <div>{`Time: ${time}`}</div> */}
          {/* <div>{body}</div> */}
        </div>
      </div>
    );
  }
}
