import * as React from "react";
import "./chat-input.css";

export interface IChatInputState {
  readonly message: string;
}

export interface IChatInputProps {
  onSubmit: (message: string) => void;
}

export class ChatInput extends React.Component<IChatInputProps> {
  public state: IChatInputState;

  constructor(props: IChatInputProps) {
    super(props);
    this.state = { message: "" };
  }

  render() {
    return (
      <form className="chat-form" onSubmit={this.handleSubmit}>
        <input
          className="chat-input"
          type="text"
          placeholder="Type a message..."
          onChange={this.handleChange}
          value={this.state.message}
        />
      </form>
    );
  }

  private handleChange = (e: any) => {
    this.setState({ message: e.currentTarget.value });
  };

  private handleSubmit = (e: any) => {
    // don't want to reload page
    e.preventDefault();

    // don't allow blank messages
    if (!this.state.message.length) {
      return;
    }

    this.props.onSubmit(this.state.message);
    this.setState({ message: "" });
  };
}
