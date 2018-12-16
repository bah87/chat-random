import * as React from "react";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "../util/route-util";
import LandingContainer from "./landing/landing-container";
import HomeContainer from "./home/home-container";
import "./App.css";

export class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Switch>
          <AuthRoute exact path="/login" component={LandingContainer} />
          <ProtectedRoute exact path="/" component={HomeContainer} />
        </Switch>
      </div>
    );
  }
}
