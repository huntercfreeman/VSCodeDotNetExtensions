import { IMessageCreate } from "../Messages/Create/IMessageCreate";
import { MessageCreateKind } from "../Messages/Create/MessageCreateKind";
import { MessageBase } from "../Messages/MessageBase";

export class CreateMessageHandler {
    public static handleMessage(message: MessageBase): void {
        let createMessage = message as unknown as IMessageCreate;

        switch (createMessage.messageCreateKind) {
            case MessageCreateKind.emptyFileInDirectory:
                break;
            case MessageCreateKind.projectInSolution:
                break;
            case MessageCreateKind.projectInSolutionFolder:
                break;
            case MessageCreateKind.solutionFolderInSolution:
                break;
            case MessageCreateKind.templatedFileInDirectory:
                break;
        }
    }
}