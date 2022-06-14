import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { CSharpProjectDependenciesFile } from "../../FileSystem/Files/CSharpProjectDependenciesFile";
import { CSharpProjectFile } from "../../FileSystem/Files/CSharpProjectFile";
import { CSharpProjectProjectReferencesFile } from "../../FileSystem/Files/CSharpProjectProjectReferencesFile";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateRemoveProject implements IMessage, IMessageUpdate {
    constructor(public readonly cSharpProjectFile: CSharpProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.removeProject;
}