import { NugetPackageModel } from "../../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../../DotNet/NugetPackageVersionModel";
import { IProjectFile } from "../../FileSystem/Files/IProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateAddNugetPackageReference implements IMessage, IMessageUpdate {
    constructor(public readonly projectFile: IProjectFile,
        public readonly nugetPackageModel: NugetPackageModel,
        public readonly nugetPackageVersionModel: NugetPackageVersionModel) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.addNugetPackageReference;
}