import { CSharpProjectFile } from "../../FileSystem/Files/CSharp/CSharpProjectFile";
import { IProjectFile } from "../../FileSystem/Files/IProjectFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateRemoveProject implements IMessage, IMessageUpdate {
    constructor(public readonly projectFile: IProjectFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.removeProject;
}