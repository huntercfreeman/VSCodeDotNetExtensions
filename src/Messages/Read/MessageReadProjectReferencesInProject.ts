import { CSharpProjectProjectReferencesListFile } from "../../FileSystem/Files/CSharp/CSharpProjectProjectReferencesListFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadProjectReferencesInProject implements IMessage, IMessageRead {
    constructor(public readonly cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesListFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.projectReferencesInProject;
}