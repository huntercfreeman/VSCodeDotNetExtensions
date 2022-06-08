import * as vscode from 'vscode';
import { IMessageDelete } from "../Messages/Delete/IMessageDelete";
import { MessageDeleteKind } from "../Messages/Delete/MessageDeleteKind";
import { IMessage } from "../Messages/IMessage";

export class DeleteMessageHandler {
    public static handleMessage(webviewView: vscode.WebviewView, message: IMessage): void {
        let deleteMessage = message as unknown as IMessageDelete;

        switch (deleteMessage.messageDeleteKind) {
            case MessageDeleteKind.genericFileInDirectory:
                break;
        }
    }
}