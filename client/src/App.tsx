import React from "react";
import { MessageContainer } from "./containers/Messages";
import { gRPCClients } from "./gRPCClients";

export const App = () => {
  return (
    <>
      <MessageContainer clients={gRPCClients} />
    </>
  );
};
