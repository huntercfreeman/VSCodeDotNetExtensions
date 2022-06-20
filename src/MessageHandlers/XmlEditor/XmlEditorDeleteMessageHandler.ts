import * as vscode from 'vscode';
import { IMessageDelete } from '../../Messages/Delete/IMessageDelete';
import { MessageDeleteKind } from '../../Messages/Delete/MessageDeleteKind';
import { IMessage } from '../../Messages/IMessage';

export class XmlEditorDeleteMessageHandler {
    public static handleMessage(webviewView: vscode.WebviewView, message: IMessage): void {
        let deleteMessage = message as unknown as IMessageDelete;
    }
}