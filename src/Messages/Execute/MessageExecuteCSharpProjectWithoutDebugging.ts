import { AbsoluteFilePath } from "../../FileSystem/AbsoluteFilePath";
import { CSharpProjectFile } from "../../FileSystem/Files/CSharpProjectFile";
import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageExecute } from "./IMessageExecute";
import { MessageExecuteKind } from "./MessageExecuteKind";

export class MessageExecuteCSharpProjectWithoutDebugging implements IMessage, IMessageExecute {
    constructor(public readonly cSharpProjectFile: CSharpProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.execute;
    public readonly messageExecuteKind: MessageExecuteKind = MessageExecuteKind.cSharpProjectWithoutDebugging;
}