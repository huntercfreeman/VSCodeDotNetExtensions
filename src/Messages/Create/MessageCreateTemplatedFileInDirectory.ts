import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { DirectoryFile } from "../../FileSystem/Files/DirectoryFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateTemplatedFileInDirectory implements IMessage, IMessageCreate {
    constructor(public readonly filenameWithExtension: string, 
                public readonly directoryFile: DirectoryFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.templatedFileInDirectory;
}