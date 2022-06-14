import { CSharpProjectFile } from "../../FileSystem/Files/CSharpProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageExecute } from "./IMessageExecute";
import { MessageExecuteKind } from "./MessageExecuteKind";

export class MessageExecuteCSharpProjectDebugging implements IMessage, IMessageExecute {
    constructor(public readonly cSharpProjectFile: CSharpProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.execute;
    public readonly messageExecuteKind: MessageExecuteKind = MessageExecuteKind.cSharpProjectDebugging;
}