import { CSharpProjectProjectReferencesListFile } from "../../FileSystem/Files/CSharp/CSharpProjectProjectReferencesListFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdateAddProjectReference implements IMessage, IMessageUpdate {
    constructor(public readonly cSharpProjectProjectReferencesFile: CSharpProjectProjectReferencesListFile) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.addProjectReference;
}