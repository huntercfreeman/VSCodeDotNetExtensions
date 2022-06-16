import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * This message is used to REFRESH the TreeView (Solution Explorer) User Interface
 * after the refreshes. One means of refreshing is through the context menu.
 */
export class MessageReadUndefinedSolution implements IMessage, IMessageRead {
    constructor() {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.undefinedSolution;
}

