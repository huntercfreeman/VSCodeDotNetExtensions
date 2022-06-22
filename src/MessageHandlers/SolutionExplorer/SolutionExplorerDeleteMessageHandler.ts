import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageDelete } from '../../Messages/Delete/IMessageDelete';
import { MessageDeleteKind } from '../../Messages/Delete/MessageDeleteKind';
import { MessageDeleteAny } from '../../Messages/Delete/MessageDeleteAny';
import { MessageReadRequestForRefresh } from '../../Messages/Read/MessageReadRequestForRefresh';

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

        let recursive = message.toBeDeletedIdeFile.absoluteFilePath.isDirectory;
        
        deleteFileWorkspaceEdit.deleteFile(vscode.Uri.file(message.toBeDeletedIdeFile.absoluteFilePath.initialAbsoluteFilePathStringInput),
        {
            recursive: recursive
        });

        vscode.workspace.applyEdit(deleteFileWorkspaceEdit).then((value: boolean) => {
            // onfulfilled
            
            // Refresh parent container in TreeView of the deleted file
            if (message.toBeDeletedIdeFile.refreshParentNonce) {
                webviewView.webview.postMessage(new MessageReadRequestForRefresh(message.toBeDeletedIdeFile.refreshParentNonce));
            }
        }, 
        (reason: any) => {
            // onrejected
            
        });
    }
}