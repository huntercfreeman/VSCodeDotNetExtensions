import * as vscode from 'vscode';
import { ConstantsCommands } from '../../Constants/ConstantsCommands';
import { IMessage } from '../../Messages/IMessage';
import { IMessageRead } from '../../Messages/Read/IMessageRead';
import { MessageReadKind } from '../../Messages/Read/MessageReadKind';
import { MessageReadProjectIntoXmlEditor } from '../../Messages/Read/MessageReadProjectIntoXmlEditor';

export class XmlEditorReadMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.projectIntoXmlEditor:
                await this.handleMessageReadProjectIntoXmlEditor(webviewView, message);
                break;
        }
    }
    
    public static async handleMessageReadProjectIntoXmlEditor(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadProjectIntoXmlEditor;

        vscode.commands.executeCommand(ConstantsCommands.DOT_NET_IDE_OPEN_PROJECT_IN_XML_EDITOR);
    }
}