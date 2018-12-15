import * as React from "react";

import { IChatMessage } from "../home/home";

import "./chat.css";

export interface IChatProps {
  readonly messages: IChatMessage[];
  readonly currentUser: string;
}

export class Chat extends React.Component<IChatProps> {
  render() {
    const { currentUser, messages } = this.props;

    return (
      <ul className="chat-message">
        {messages.map((msg: IChatMessage) => {
          console.log("msg: ", currentUser, msg.user);
          return (
            <li
              key={msg.id}
              className={`chat-message ${
                currentUser === msg.user ? "current-user" : ""
              }`}
            >
              <div>{`Time: ${msg.time}`}</div>
              <div>{`Username: ${msg.user}`}</div>
              <div>{`Body: ${msg.body}`}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
