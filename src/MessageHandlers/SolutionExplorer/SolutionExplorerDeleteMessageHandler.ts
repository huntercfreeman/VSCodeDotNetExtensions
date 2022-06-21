import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageDelete } from '../../Messages/Delete/IMessageDelete';
import { MessageDeleteKind } from '../../Messages/Delete/MessageDeleteKind';
import { MessageDeleteAny } from '../../Messages/Delete/MessageDeleteAny';

export class SolutionExplorerDeleteMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let deleteMessage = message as unknown as IMessageDelete;

        switch (deleteMessage.messageDeleteKind) {
            case MessageDeleteKind.any:
                await this.handleMessageDeleteAny(webviewView, message);
                break;
        }
    }

    private static handleMessageDeleteAny(webviewView: vscode.WebviewView, untypedMessage: IMessage) {
        let message = untypedMessage as MessageDeleteAny;

        let deleteFileWorkspaceEdit = new vscode.WorkspaceEdit();

        deleteFileWorkspaceEdit.deleteFile(vscode.Uri.file(message.toBeDeletedIdeFile.absoluteFilePath.initialAbsoluteFilePathStringInput));

        vscode.workspace.applyEdit(deleteFileWorkspaceEdit).then((value: boolean) => {
            // onfulfilled

        }, 
        (reason: any) => {
            // onrejected
            
        });
    }
}