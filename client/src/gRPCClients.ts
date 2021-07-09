import { EchoClient } from "./echo/EchoServiceClientPb";

export type GRPCClients = {
  echoClient: EchoClient;
};

export const gRPCClients: GRPCClients = {
  echoClient: new EchoClient("http://localhost:8080"),
};
