import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IdeFile } from "../../FileSystem/Files/IdeFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateSolutionFolderInAny implements IMessage, IMessageCreate {
    constructor(public readonly ideFile: IdeFile, 
                public readonly solutionFolderName: string) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.solutionFolderInAny;
}