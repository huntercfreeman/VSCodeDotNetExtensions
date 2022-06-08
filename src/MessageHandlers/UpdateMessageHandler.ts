import { MessageBase } from "../Messages/MessageBase";
import { IMessageUpdate } from "../Messages/Update/IMessageUpdate";

export class UpdateMessageHandler {
    public static handleMessage(message: MessageBase): void {
        let updateMessage = message as unknown as IMessageUpdate;

        switch (updateMessage.messageUpdateKind) {
            
        }
    }
}