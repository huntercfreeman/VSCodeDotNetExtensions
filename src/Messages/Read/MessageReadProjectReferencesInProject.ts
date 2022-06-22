import { ProjectToProjectReferencesListFile } from "../../FileSystem/Files/ProjectReference/ProjectToProjectReferencesListFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadProjectReferencesInProject implements IMessage, IMessageRead {
    constructor(public readonly projectProjectReferencesFile: ProjectToProjectReferencesListFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.projectReferencesInProject;
}