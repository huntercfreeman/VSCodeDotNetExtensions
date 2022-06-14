import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateSolutionFolderInSolution implements IMessage, IMessageCreate {
    constructor(public readonly dotNetSolutionFile: DotNetSolutionFile, 
                public readonly solutionFolderName: string) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.solutionFolderInSolution;
}