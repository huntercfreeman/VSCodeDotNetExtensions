import { NugetPackageModel } from "../../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../../DotNet/NugetPackageVersionModel";
import { CSharpProjectFile } from "../../FileSystem/Files/CSharpProjectFile";
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