import { IProjectModel } from "../../DotNet/IProjectModel";
import { XmlFileModel } from "../../Parsers/XmlParseStateMachines";
import { IMessage } from "../IMessage";
import { MessageCategory } from "../MessageCategory";
import { IMessageRead } from "./IMessageRead";
import { MessageReadKind } from "./MessageReadKind";

/**
 * The message is used to open a file in Visual Studio Code text editors.
 */
export class MessageReadProjectXmlIntoXmlEditor implements IMessage, IMessageRead {
    constructor(public readonly projectModel: IProjectModel,
        public xmlFileModel: XmlFileModel) {
    }

    public readonly messageCategory: MessageCategory = MessageCategory.read;
    public readonly messageReadKind: MessageReadKind = MessageReadKind.projectXmlIntoXmlEditor;
}