import * as React from "react";

export interface IHomeProps {
  readonly username: string;
}

export class Home extends React.Component<IHomeProps> {
  constructor(props: IHomeProps) {
    super(props);
  }

  render() {
    return (
      <div>{`Welcome ${
        this.props.username
      }! Waiting on the next available user`}</div>
    );
  }
}
