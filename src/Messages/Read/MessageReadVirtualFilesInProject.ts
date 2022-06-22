import { IProjectFile } from "../../FileSystem/Files/IProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadVirtualFilesInProject implements IMessage, IMessageRead {
    constructor(public readonly projectFile: IProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.virtualFilesInProject;
}