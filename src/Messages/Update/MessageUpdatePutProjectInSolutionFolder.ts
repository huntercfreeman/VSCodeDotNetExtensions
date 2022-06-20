import { IProjectModel } from "../../DotNet/IProjectModel";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageUpdate } from "./IMessageUpdate";
import { MessageUpdateKind } from "./MessageUpdateKind";

export class MessageUpdatePutProjectInSolutionFolder implements IMessage, IMessageUpdate {
    constructor(public readonly projectModel: IProjectModel,
        public readonly solutionFolderName: string) {
            let z = 2;
            let x = z + 1;
    }

    public readonly messageCategory: MessageCategory = MessageCategory.update;
    public readonly messageUpdateKind: MessageUpdateKind = MessageUpdateKind.putProjectInSolutionFolder;
}