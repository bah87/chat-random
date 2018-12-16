import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";

export class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <FontAwesomeIcon icon="random" />
        <div className="header-name">chatrandom</div>
      </div>
    );
  }
}
