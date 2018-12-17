import * as React from "react";
import { IChatMessage, IBaseMessage } from "../home/home";
import { Message } from "../message/message";
import { ChatInput, IChatInputProps } from "../chat-input/chat-input";
import "./chat.css";

export interface IChatProps extends IChatInputProps {
  readonly messages: IChatMessage[];
  readonly pairedUser?: string;
}

export interface IGroupedMessage extends IBaseMessage {
  readonly messages: IChatMessage[];
}

export class Chat extends React.Component<IChatProps> {
  private messagesEnd: React.RefObject<HTMLDivElement>;

  constructor(props: IChatProps) {
    super(props);
    this.messagesEnd = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages, onSubmit } = this.props;

    return (
      <div className="chat-message-container">
        <div className="chat-message-header">{this.props.pairedUser}</div>
        <ul className="chat-message-list">
          {this.groupMessages(messages).map((msg: IGroupedMessage) => {
            return (
              <li key={`group-${msg._id}`} className="chat-message">
                <Message message={msg} />
              </li>
            );
          })}
          <li key="messages-end">
            <div ref={this.messagesEnd} className="chat-messages-end" />
          </li>
        </ul>

        <div className="chat-message-footer">
          <ChatInput onSubmit={onSubmit} />
        </div>
      </div>
    );
  }

  private scrollToBottom = () => {
    if (this.messagesEnd.current) {
      this.messagesEnd.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  private groupMessages = (messages: IChatMessage[]): IGroupedMessage[] => {
    const grouped: IGroupedMessage[] = [];
    let group: IChatMessage[] = [];

    messages.forEach((message: IChatMessage) => {
      if (!group.length || group[0].author === message.author) {
        group.push(message);
      } else {
        grouped.push({ ...group[0], messages: group });
        group = [message];
      }
    });

    if (!!group.length) {
      grouped.push({ ...group[0], messages: group });
    }

    return grouped;
  };
}
