import { IProjectFile } from "../../FileSystem/Files/IProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * The message is used to open a file in Visual Studio Code text editors.
 */
export class MessageReadProjectIntoXmlEditor implements IMessage, IMessageRead {
    constructor(public readonly projectFile: IProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.projectIntoXmlEditor;
}