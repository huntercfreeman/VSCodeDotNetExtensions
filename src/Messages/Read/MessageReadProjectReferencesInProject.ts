import { CSharpProjectProjectReferencesFile } from "../../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { DirectoryFile } from "../../FileSystem/Files/DirectoryFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadProjectReferencesInProject implements IMessage, IMessageRead {
    constructor(public readonly cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.projectReferencesInProject;
}