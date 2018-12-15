import * as React from "react";
import { Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route-util";
import LandingContainer from "./landing/landing-container";
import HomeContainer from "./home/home-container";

export class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <AuthRoute exact path="/login" component={LandingContainer} />
          <ProtectedRoute exact path="/" component={HomeContainer} />
        </Switch>
      </div>
    );
  }
}
