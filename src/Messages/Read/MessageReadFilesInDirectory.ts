import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadFilesInDirectory implements IMessage, IMessageRead {
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.filesInDirectory;
}