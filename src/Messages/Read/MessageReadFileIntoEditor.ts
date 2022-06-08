import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IdeFile } from "../../FileSystem/Files/IdeFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * The message is used to open a file in Visual Studio Code text editors.
 */
export class MessageReadFileIntoEditor implements IMessage, IMessageRead {
    constructor(public readonly ideFile: IdeFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.fileIntoEditor;
}