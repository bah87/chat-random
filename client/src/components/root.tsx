import * as React from "react";
import { Store } from "redux";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { App } from "./App";

export interface IRootProps {
  store: Store;
}

const Root = (props: IRootProps) => {
  return (
    <Provider store={props.store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  );
};

export default Root;
