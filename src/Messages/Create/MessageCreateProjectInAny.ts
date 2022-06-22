import { IdeFile } from "../../FileSystem/Files/IdeFile";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageCreate } from "./IMessageCreate";
import { MessageCreateKind } from "./MessageCreateKind";

export class MessageCreateProjectInAny implements IMessage, IMessageCreate {
    constructor(public readonly ideFile: IdeFile,
        public readonly projectNameWithExtension: string,
        public readonly projectNameNoExtension: string,
        public readonly templateName: string,
        public readonly lang: string) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.create;
    public readonly messageCreateKind: MessageCreateKind = MessageCreateKind.projectInAny;
}