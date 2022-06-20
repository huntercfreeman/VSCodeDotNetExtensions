import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageRead } from '../../Messages/Read/IMessageRead';

export class NugetPackageManagerReadMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;
    }
}