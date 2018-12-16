import * as React from "react";
import { IChatMessage } from "../home/home";
import { Message } from "../message/message";
import { ChatInput, IChatInputProps } from "../chat-input/chat-input";
import "./chat.css";

export interface IChatProps extends IChatInputProps {
  readonly messages: IChatMessage[];
  readonly currentUser: string;
}

export class Chat extends React.Component<IChatProps> {
  render() {
    const { currentUser, messages, onSubmit } = this.props;

    return (
      <div className="chat-message-container">
        <ul className="chat-message-list">
          {messages.map((msg: IChatMessage) => {
            console.log("msg: ", currentUser, msg.user);
            return (
              <li
                key={msg.id}
                className={`chat-message ${
                  currentUser === msg.user ? "current-user" : ""
                }`}
              >
                <Message message={msg} />
              </li>
            );
          })}
        </ul>
        <ChatInput onSubmit={onSubmit} />
      </div>
    );
  }
}
