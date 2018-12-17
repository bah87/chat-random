import * as React from "react";
import { PairingStatusEnum } from "../../types";
import { Header } from "../header/header";
import "./chat-loading.css";

export interface IChatLoadingProps {
  readonly pairingStatus: PairingStatusEnum;
  readonly pairedUser?: string;
}

export class ChatLoading extends React.Component<IChatLoadingProps> {
  render() {
    const { pairedUser, pairingStatus } = this.props;

    return (
      <div className="chat-loading-container">
        <Header />
        <div className="chat-waiting">
          {pairingStatus === PairingStatusEnum.Unpaired ? (
            <>
              <div className="chat-waiting-message">
                Please wait for the next available user
              </div>
              <div className="chat-waiting-info">
                While we have you, let us tell you about some new features that
                are currently in development:
                <ul>
                  <li key={1}>login with Google/Facebook</li>
                  <li key={2}>chat with groups of friends</li>
                  <li key={3}>express yourself with emojis, gifs and images</li>
                  <li key={4}>customize your user profile</li>
                </ul>
              </div>
            </>
          ) : (
            <div>{`Thank you for your patience. You are now being paired with ${pairedUser}. Happy chatting!`}</div>
          )}
        </div>
      </div>
    );
  }
}
