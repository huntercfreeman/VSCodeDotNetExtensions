import { DotNetSolutionFile } from "../../FileSystem/Files/DotNetSolutionFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateExistingProjectIntoSolution implements IMessage, IMessageUpdate {
    constructor(public readonly dotNetSolutionFile: DotNetSolutionFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.existingProjectIntoSolution;
}