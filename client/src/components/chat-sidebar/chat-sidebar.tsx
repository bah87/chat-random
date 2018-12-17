import * as React from "react";
import "./chat-sidebar.css";

export interface IChatSideBarProps {
  readonly currentUser: string;
}

export class ChatSideBar extends React.Component<IChatSideBarProps> {
  render() {
    return (
      <div className="chat-sidebar">
        <div className="chat-sidebar-user">{this.props.currentUser}</div>
      </div>
    );
  }
}
