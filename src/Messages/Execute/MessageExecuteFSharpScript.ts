import { FSXFile } from "../../FileSystem/Files/FSharp/FSXFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageExecute } from "./IMessageExecute";
import { MessageExecuteKind } from "./MessageExecuteKind";

export class MessageExecuteFSharpScript implements IMessage, IMessageExecute {
    constructor(public readonly fsxFile: FSXFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.execute;
    public readonly messageExecuteKind: MessageExecuteKind = MessageExecuteKind.fSharpScript;
}