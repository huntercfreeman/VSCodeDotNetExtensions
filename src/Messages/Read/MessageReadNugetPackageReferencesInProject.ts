import { CSharpProjectNugetPackageDependenciesListFile } from "../../FileSystem/Files/CSharp/CSharpProjectNugetPackageDependenciesListFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadNugetPackageReferencesInProject implements IMessage, IMessageRead {
    constructor(public readonly cSharpProjectNugetPackageDependenciesFile: CSharpProjectNugetPackageDependenciesListFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.nugetPackageReferencesInProject;
}