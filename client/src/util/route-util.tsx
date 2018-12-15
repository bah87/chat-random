import * as React from "react";
import { RouteComponentProps, withRouter, Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { IAppState } from "../store/store";

export interface IRouteProps extends RouteComponentProps<any> {
  readonly isAuthenticated: boolean;
  readonly path: string;
  readonly component: React.ComponentClass;
  readonly exact?: boolean;
}

class Protected extends React.Component<IRouteProps, {}> {
  render() {
    const { isAuthenticated, path, component: Component } = this.props;

    return (
      <Route
        path={path}
        render={props =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

class Auth extends React.Component<IRouteProps, {}> {
  render() {
    const { isAuthenticated, path, component: Component } = this.props;

    return (
      <Route
        path={path}
        render={props =>
          !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  isAuthenticated: state.username ? !!state.username.length : false
});

export const ProtectedRoute = withRouter(
  connect(
    mapStateToProps,
    undefined
  )(Protected)
);

export const AuthRoute = withRouter(
  connect(
    mapStateToProps,
    undefined
  )(Auth)
);
