import * as vscode from 'vscode';
import { IMessage } from '../../Messages/IMessage';
import { IMessageCreate } from '../../Messages/Create/IMessageCreate';

export class NugetPackageManagerCreateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let createMessage = message as unknown as IMessageCreate;
    }
}