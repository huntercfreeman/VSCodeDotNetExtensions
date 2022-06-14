import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateDotNetSolutionInWorkspace implements IMessage, IMessageCreate {
    constructor(public readonly solutionNameWithoutExtension: string) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.dotNetSolutionInWorkspace;
}