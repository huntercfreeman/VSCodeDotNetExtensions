import { VCXProjectFilterListFile } from "../../FileSystem/Files/CPlusPlus/VCXProjectFilterListFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadVCXFilterMatches implements IMessage, IMessageRead {
    constructor(public readonly vcxProjectFilterListFile: VCXProjectFilterListFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.vcxFilterMatches;
}