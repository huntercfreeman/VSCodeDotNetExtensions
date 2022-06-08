import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateProjectInSolution implements IMessage, IMessageCreate {
    /**
     *
     */
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.projectInSolution;
}