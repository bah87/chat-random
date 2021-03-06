import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./components/root";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRandom, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faRandom, faArrowRight);

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore({});
  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
