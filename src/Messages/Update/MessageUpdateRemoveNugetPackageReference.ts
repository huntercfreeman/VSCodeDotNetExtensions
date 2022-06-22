import { ProjectNugetPackageDependencyFile } from "../../FileSystem/Files/Nuget/ProjectNugetPackageDependencyFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateRemoveNugetPackageReference implements IMessage, IMessageUpdate {
    constructor(public readonly projectNugetPackageDependencyFile: ProjectNugetPackageDependencyFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.removeNugetPackageReference;
}