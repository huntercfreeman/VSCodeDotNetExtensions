import { FSharpProjectFile } from "../../FileSystem/Files/FSharp/FSharpProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadVirtualFilesInFSharpProject implements IMessage, IMessageRead {
    constructor(public readonly fSharpProjectFile: FSharpProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.virtualFilesInFSharpProject;
}