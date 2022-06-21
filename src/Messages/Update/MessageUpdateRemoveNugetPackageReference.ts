import { CSharpProjectNugetPackageDependencyFile } from "../../FileSystem/Files/CSharp/CSharpProjectNugetPackageDependencyFile";
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