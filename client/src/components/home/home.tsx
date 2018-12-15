import * as React from "react";
import { HomeViewModel } from "./home-view-model";

export class Home extends React.Component<any> {
  private viewModel: HomeViewModel;

  constructor(props: any) {
    super(props);
    this.viewModel = new HomeViewModel();
  }

  render() {
    return <div>Welcome to the home page!</div>;
  }
}
