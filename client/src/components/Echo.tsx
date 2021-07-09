import React from "react";
import { EchoClient } from "../echo/EchoServiceClientPb";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { ClientReadableStream } from "grpc-web";
import { EchoResponse } from "../echo/echo_pb";

type Props = {
  client: EchoClient;
};

type State = {
  message: string;
};

export class Echo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  componentDidMount() {
    const stream = this.props.client.get(
      new Empty()
    ) as ClientReadableStream<EchoResponse>;
    stream.on("data", (response) => {
      this.setState({
        message: response.getMessage(),
      });
    });
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}
