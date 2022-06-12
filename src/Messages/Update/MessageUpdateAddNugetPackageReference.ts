import { NugetPackageModel } from "../../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../../DotNet/NugetPackageVersionModel";
import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { CSharpProjectDependenciesFile } from "../../FileSystem/Files/CSharpProjectDependenciesFile";
import { CSharpProjectFile } from "../../FileSystem/Files/CSharpProjectFile";
import { CSharpProjectProjectReferencesFile } from "../../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateAddNugetPackageReference implements IMessage, IMessageUpdate {
    constructor(public readonly cSharpProjectFile: CSharpProjectFile,
        public readonly nugetPackageModel: NugetPackageModel,
        public readonly nugetPackageVersionModel: NugetPackageVersionModel) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.addNugetPackageReference;
}