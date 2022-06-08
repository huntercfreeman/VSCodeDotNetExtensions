import { MessageBase } from "../Messages/MessageBase";
import { MessageCategory } from "../Messages/MessageCategory";
import { CreateMessageHandler } from "./CreateMessageHandler";
import { DeleteMessageHandler } from "./DeleteMessageHandler";
import { ReadMessageHandler } from "./ReadMessageHandler";
import { UpdateMessageHandler } from "./UpdateMessageHandler";

export class SidebarProviderMessageHandler {
    public static handleMessage(untypedMessage: any): void {

        let message = untypedMessage as MessageBase;

        switch (message.messageCategory) {
            case MessageCategory.create:
              return CreateMessageHandler.handleMessage(message);
            case MessageCategory.read: 
              return ReadMessageHandler.handleMessage(message);
            case MessageCategory.update:
              return UpdateMessageHandler.handleMessage(message);
            case MessageCategory.delete:              
              return DeleteMessageHandler.handleMessage(message);
          }
    }
}