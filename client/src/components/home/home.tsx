import * as React from "react";
import { HomeViewModel } from "./home-view-model";

export class Home extends React.Component<any> {
  private viewModel: HomeViewModel;

  constructor(props: any) {
    super(props);
    this.viewModel = new HomeViewModel();
  }

  render() {
    return (
      <div>
        <div>Welcome to the ChatRandom</div>
        <div>
          Enter a username and you'll be chatting with someone in no time!
        </div>
        <input type="text" placeholder="Enter username" />
      </div>
    );
  }
}
