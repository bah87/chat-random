import React, { Component } from "react";
import { Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route-util";
import LandingContainer from "./landing/landing-container";
import { Home } from "./home/home";

export class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <AuthRoute exact path="/login" component={LandingContainer} />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}
