import { IProjectModel } from "../../DotNet/IProjectModel";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageExecute } from "./IMessageExecute";
import { MessageExecuteKind } from "./MessageExecuteKind";

export class MessageExecuteProjectWithoutDebugging implements IMessage, IMessageExecute {
    constructor(public readonly projectModel: IProjectModel) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.execute;
    public readonly messageExecuteKind: MessageExecuteKind = MessageExecuteKind.projectWithoutDebugging;
}