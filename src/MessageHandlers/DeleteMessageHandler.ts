import { IMessageDelete } from "../Messages/Delete/IMessageDelete";
import { MessageDeleteKind } from "../Messages/Delete/MessageDeleteKind";
import { MessageBase } from "../Messages/MessageBase";

export class DeleteMessageHandler {
    public static handleMessage(message: MessageBase): void {
        let deleteMessage = message as unknown as IMessageDelete;

        switch (deleteMessage.messageDeleteKind) {
            case MessageDeleteKind.genericFileInDirectory:
                break;
        }
    }
}