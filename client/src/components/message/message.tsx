import * as React from "react";
import { IChatMessage, IGroupedMessage } from "../../types";
import "./message.css";

export interface IMessageProps {
  readonly message: IGroupedMessage;
}

export class Message extends React.Component<IMessageProps> {
  render() {
    const { updatedAt, author, messages } = this.props.message;

    return (
      <div className="message-container">
        <div className="message-header">
          <div className="message-user">{author}</div>
          <div className="message-time">{updatedAt}</div>
        </div>
        <ul className="message-items">
          {messages.map((message: IChatMessage) => (
            <li className="message-item" key={message._id}>
              <div className="message-item-time">{message.updatedAt}</div>
              {message.body}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
