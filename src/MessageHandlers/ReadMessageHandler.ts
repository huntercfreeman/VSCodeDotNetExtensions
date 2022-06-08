import { MessageBase } from "../Messages/MessageBase";
import { IMessageRead } from "../Messages/Read/IMessageRead";
import { MessageReadKind } from "../Messages/Read/MessageReadKind";

export class ReadMessageHandler {
    public static handleMessage(message: MessageBase): void {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.fileIntoEditor:
                break;
            case MessageReadKind.filesInDirectory:
                break;
            case MessageReadKind.solutionIntoTreeView:
                break;
            case MessageReadKind.solutionsInWorkspace:
                break;
        }
    }
}