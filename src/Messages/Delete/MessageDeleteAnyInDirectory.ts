import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IdeFile } from "../../FileSystem/Files/IdeFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageDelete } from "./IMessageDelete";
import { MessageDeleteKind } from "./MessageDeleteKind";

export class MessageDeleteAnyInDirectory implements IMessage, IMessageDelete {
    constructor(public readonly ideFile: IdeFile,
        public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.delete;
    public readonly messageDeleteKind: MessageDeleteKind = MessageDeleteKind.anyInDirectory;
}