import { CSharpProjectProjectReferenceFile } from "../../FileSystem/Files/CSharpProjectProjectReferenceFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateRemoveProjectReference implements IMessage, IMessageUpdate {
    constructor(public readonly cSharpProjectProjectReferenceFile: CSharpProjectProjectReferenceFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.removeProjectReference;
}