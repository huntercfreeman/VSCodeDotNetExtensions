import { IdeFile } from "../../FileSystem/Files/IdeFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdatePasteIntoAny implements IMessage, IMessageUpdate {
    constructor(public readonly ideFile: IdeFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.pasteIntoAny;
}