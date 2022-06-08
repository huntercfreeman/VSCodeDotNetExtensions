import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { MessageBase } from "../MessageBase";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

export class MessageReadSolutionsInWorkspace extends MessageBase implements IMessageRead {
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
        super();
        
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.solutionsInWorkspace;
}