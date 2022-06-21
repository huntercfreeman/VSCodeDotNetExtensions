import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageDelete } from '../../Messages/Delete/IMessageDelete';
import { MessageDeleteKind } from '../../Messages/Delete/MessageDeleteKind';

export class SolutionExplorerDeleteMessageHandler {
    public static handleMessage(webviewView: vscode.WebviewView, message: IMessage): void {
        let deleteMessage = message as unknown as IMessageDelete;
    }
}