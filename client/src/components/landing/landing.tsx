import * as React from "react";

export interface ILandingState {
  readonly username: string;
}

export interface ILandingProps {
  loginUser: (username: string) => void;
}

export class Landing extends React.Component<ILandingProps> {
  public state: ILandingState;

  constructor(props: ILandingProps) {
    super(props);
    this.state = { username: "" };
  }

  handleChange = (e: any) => {
    this.setState({ username: e.currentTarget.value });
  };

  handleClick = () => {
    if (!this.state.username.length) {
      return;
    }

    this.props.loginUser(this.state.username);
  };

  render() {
    return (
      <div>
        <div>Welcome to the ChatRandom</div>
        <div>
          Enter a username and you'll be chatting with someone in no time!
        </div>
        <input
          type="text"
          placeholder="Enter username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }
}
