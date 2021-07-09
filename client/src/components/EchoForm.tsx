import React, { SyntheticEvent } from "react";
import { EchoClient } from "../echo/EchoServiceClientPb";
import { EchoRequest } from "../echo/echo_pb";

type Props = {
  client: EchoClient;
};

type State = {
  message: string;
};

export class EchoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  onChange(event: SyntheticEvent) {
    const target = event.target as HTMLInputElement;
    this.setState({
      message: target.value,
    });
  }

  onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const request = new EchoRequest();
    request.setMessage(this.state.message);
    this.props.client.send(request, null, (error) => {
      if (error) {
        console.error(error);
      }
    });
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.message}
          onChange={this.onChange.bind(this)}
        />
      </form>
    );
  }
}
