import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageDelete } from "./IMessageDelete";
import { MessageDeleteKind } from "./MessageDeleteKind";

export class MessageDeleteAddEmptyFileToDirectory implements IMessage, IMessageDelete {
    constructor(public readonly filenameWithExtension: string,
        public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.delete;
    public readonly messageDeleteKind: MessageDeleteKind = MessageDeleteKind.genericFileInDirectory;
}