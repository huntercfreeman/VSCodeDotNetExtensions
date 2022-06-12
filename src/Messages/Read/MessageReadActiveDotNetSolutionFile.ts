import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * This message is used to sync the non Solution Explorer webviews with the solution explorer
 */
export class MessageReadActiveDotNetSolutionFile implements IMessage, IMessageRead {
    constructor(public activeDotNetSolutionFile: DotNetSolutionFile | undefined) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.activeDotNetSolutionFile;
}