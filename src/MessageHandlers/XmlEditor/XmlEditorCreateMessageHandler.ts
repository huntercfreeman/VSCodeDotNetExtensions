import * as vscode from 'vscode';
import { IMessageCreate } from '../../Messages/Create/IMessageCreate';
import { MessageCreateKind } from '../../Messages/Create/MessageCreateKind';
import { IMessage } from '../../Messages/IMessage';

export class XmlEditorCreateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let createMessage = message as unknown as IMessageCreate;
    }
}