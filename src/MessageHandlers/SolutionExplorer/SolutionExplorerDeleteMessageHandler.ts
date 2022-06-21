import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageDelete } from '../../Messages/Delete/IMessageDelete';
import { MessageDeleteKind } from '../../Messages/Delete/MessageDeleteKind';

export class SolutionExplorerDeleteMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let deleteMessage = message as unknown as IMessageDelete;

        switch (deleteMessage.messageDeleteKind) {
            case MessageDeleteKind.anyInDirectory:
                await this.handleMessageDeleteAnyInDirectory(webviewView, message);
                break;
        }
    }

    private static handleMessageDeleteAnyInDirectory(webviewView: vscode.WebviewView, message: IMessage) {
        throw new Error('Method not implemented.');
    }
}