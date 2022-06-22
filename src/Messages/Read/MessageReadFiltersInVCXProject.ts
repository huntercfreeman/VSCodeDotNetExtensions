import { VCXProjectFile } from "../../FileSystem/Files/CPlusPlus/VCXProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadFiltersInVCXProject implements IMessage, IMessageRead {
    constructor(public readonly vCXProjectFile: VCXProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.filtersInVCXProject;
}