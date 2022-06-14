import { DotNetSolutionFile } from '../../FileSystem/Files/DotNetSolutionFile';
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadSolutionsInWorkspace implements IMessage, IMessageRead {
    constructor() {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.solutionsInWorkspace;

    public dotNetSolutionFiles: DotNetSolutionFile[] | undefined = undefined;
}