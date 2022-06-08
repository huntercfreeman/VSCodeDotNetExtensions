import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { MessageBase } from "../MessageBase";
import { MessageCategory } from "../MessageCategory";
import { IMessageDelete } from "./IMessageDelete";
import { MessageDeleteKind } from "./MessageDeleteKind";

export class MessageDeleteAddEmptyFileToDirectory extends MessageBase implements IMessageDelete {
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryAbsoluteFilePath: AbsoluteFilePath) {
        super();
        
    }

    public readonly messageCategory: MessageCategory = MessageCategory.delete;
    public readonly messageDeleteKind: MessageDeleteKind = MessageDeleteKind.genericFileInDirectory;
}