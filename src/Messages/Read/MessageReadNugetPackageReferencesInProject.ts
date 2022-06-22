import { ProjectNugetPackageDependenciesListFile } from "../../FileSystem/Files/Nuget/ProjectNugetPackageDependenciesListFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadNugetPackageReferencesInProject implements IMessage, IMessageRead {
    constructor(public readonly projectNugetPackageDependenciesFile: ProjectNugetPackageDependenciesListFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.nugetPackageReferencesInProject;
}