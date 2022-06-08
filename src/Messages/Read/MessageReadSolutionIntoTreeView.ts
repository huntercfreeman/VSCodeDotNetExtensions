import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { MessageBase } from "../MessageBase";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * This message is used to create the TreeView (Solution Explorer) User Interface
 * after the user selects a .NET Solution.
 */
export class MessageReadSolutionIntoTreeView extends MessageBase implements IMessageRead {
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
        super();
        
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.solutionIntoTreeView;
}