import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageUpdate } from '../../Messages/Update/IMessageUpdate';
import { MessageUpdateKind } from '../../Messages/Update/MessageUpdateKind';

export class XmlEditorUpdateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewPanel, message: IMessage): Promise<void> {
        let updateMessage = message as unknown as IMessageUpdate;
    }
}