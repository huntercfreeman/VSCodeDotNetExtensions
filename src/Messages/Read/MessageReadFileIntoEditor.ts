import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * The message is used to open a file in Visual Studio Code text editors.
 */
export class MessageReadFileIntoEditor implements IMessage, IMessageRead {
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.fileIntoEditor;
}