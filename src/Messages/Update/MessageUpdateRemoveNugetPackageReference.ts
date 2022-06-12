import { NugetPackageModel } from "../../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../../DotNet/NugetPackageVersionModel";
import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { CSharpProjectDependenciesFile } from "../../FileSystem/Files/CSharpProjectDependenciesFile";
import { CSharpProjectFile } from "../../FileSystem/Files/CSharpProjectFile";
import { CSharpProjectNugetPackageDependencyFile } from "../../FileSystem/Files/CSharpProjectNugetPackageDependencyFile";
import { CSharpProjectProjectReferencesFile } from "../../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateRemoveNugetPackageReference implements IMessage, IMessageUpdate {
    constructor(public readonly cSharpProjectNugetPackageDependencyFile: CSharpProjectNugetPackageDependencyFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.removeNugetPackageReference;
}