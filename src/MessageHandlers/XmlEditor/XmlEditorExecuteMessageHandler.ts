import * as vscode from 'vscode';
import { IMessageExecute } from '../../Messages/Execute/IMessageExecute';
import { MessageExecuteKind } from '../../Messages/Execute/MessageExecuteKind';
import { IMessage } from '../../Messages/IMessage';

export class XmlEditorExecuteMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let executeMessage = message as unknown as IMessageExecute;
    }
}