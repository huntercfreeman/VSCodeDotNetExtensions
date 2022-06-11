import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateCSharpProjectInSolution implements IMessage, IMessageCreate {
    constructor(public readonly dotNetSolutionFile: DotNetSolutionFile,
                public readonly cSharpProjectNameNoExtension: string, 
                public readonly templateName: string) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.cSharpProjectInSolution;
}