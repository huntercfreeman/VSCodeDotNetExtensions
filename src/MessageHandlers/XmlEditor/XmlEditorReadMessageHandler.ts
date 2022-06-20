import * as vscode from 'vscode';
import { ConstantsCommands } from '../../Constants/ConstantsCommands';
import { IMessage } from '../../Messages/IMessage';
import { IMessageRead } from '../../Messages/Read/IMessageRead';
import { MessageReadKind } from '../../Messages/Read/MessageReadKind';
import { MessageReadProjectIntoXmlEditor } from '../../Messages/Read/MessageReadProjectIntoXmlEditor';

export class XmlEditorReadMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;
    }
}