import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IdeFile } from "../../FileSystem/Files/IdeFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageDelete } from "./IMessageDelete";
import { MessageDeleteKind } from "./MessageDeleteKind";

export class MessageDeleteAny implements IMessage, IMessageDelete {
    constructor(public readonly toBeDeletedIdeFile: IdeFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.delete;
    public readonly messageDeleteKind: MessageDeleteKind = MessageDeleteKind.any;
}