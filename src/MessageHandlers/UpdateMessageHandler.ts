import * as vscode from 'vscode';
import { IMessage } from "../Messages/IMessage";
import { IMessageUpdate } from "../Messages/Update/IMessageUpdate";

export class UpdateMessageHandler {
    public static handleMessage(webviewView: vscode.WebviewView, message: IMessage): void {
        let updateMessage = message as unknown as IMessageUpdate;

        switch (updateMessage.messageUpdateKind) {
            
        }
    }
}