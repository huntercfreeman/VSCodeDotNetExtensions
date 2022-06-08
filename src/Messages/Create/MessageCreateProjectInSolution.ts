import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { MessageBase } from "../MessageBase";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateProjectInSolution extends MessageBase implements IMessageCreate {
    /**
     *
     */
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
        super();
        
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.projectInSolution;
}