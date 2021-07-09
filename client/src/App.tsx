import React from "react";
import { gRPCClients } from "./gRPCClients";
import { Echo } from "./components/Echo";
import { EchoForm } from "./components/EchoForm";

export class App extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <EchoForm client={gRPCClients.echoClient} />
        <Echo client={gRPCClients.echoClient} />
      </React.Fragment>
    );
  }
}
