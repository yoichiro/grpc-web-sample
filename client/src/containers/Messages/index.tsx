import { GRPCClients } from "../../gRPCClients";
import { MessageForm } from "../../components/MessageForm";
import { Messages } from "../../components/Messages";
import React from "react";
import { useMessageForm } from "./hooks/useMessageForm";
import { useMessages } from "./hooks/useMessage";

type Props = {
  clients: GRPCClients;
};

export const MessageContainer: React.FC<Props> = ({ clients }) => {
  const messengerClient = clients.messengerClient;
  const messageState = useMessages(messengerClient);
  const messageFormState = useMessageForm(messengerClient);
  return (
    <div>
      <MessageForm {...messageFormState} />
      <Messages {...messageState} />
    </div>
  );
};
