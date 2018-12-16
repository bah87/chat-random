import * as React from "react";
import { IChatMessage } from "../home/home";
import { IGroupedMessage } from "../chat/chat";
import "./message.css";

export interface IMessageProps {
  readonly message: IGroupedMessage;
}

export class Message extends React.Component<IMessageProps> {
  render() {
    const { time, user, messages } = this.props.message;

    return (
      <div className="message-container">
        <div className="message-header">
          <div className="message-user">{user}</div>
          <div className="message-time">{time}</div>
        </div>
        <ul className="message-items">
          {messages.map((message: IChatMessage) => (
            <li className="message-item" key={message.id}>
              {message.body}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
