import * as vscode from 'vscode';
import { IMessageExecute } from '../../Messages/Execute/IMessageExecute';
import { IMessage } from '../../Messages/IMessage';

export class NugetPackageManagerExecuteMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let executeMessage = message as unknown as IMessageExecute;
    }
}