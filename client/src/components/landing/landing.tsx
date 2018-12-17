import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../header/header";
import "./landing.css";

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

  render() {
    return (
      <div className="landing-container">
        <Header />
        <div className="sign-in">
          <div className="sign-in-prompt">Enter a username to get started</div>
          <input
            className="sign-in-input"
            type="text"
            placeholder="your-clever-username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <button className="sign-in-btn" onClick={this.handleClick}>
            <div className="sign-in-btn-text">Continue</div>
            <FontAwesomeIcon icon="arrow-right" />
          </button>
        </div>
      </div>
    );
  }

  private handleChange = (e: any) => {
    this.setState({ username: e.currentTarget.value });
  };

  private handleClick = () => {
    if (!this.state.username.length) {
      return;
    }

    this.props.loginUser(this.state.username);
  };
}
