import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../../Constants/ConstantsDotNetCli';
import { IMessage } from '../../Messages/IMessage';
import { IMessageUpdate } from '../../Messages/Update/IMessageUpdate';
import { MessageUpdateAddNugetPackageReference } from '../../Messages/Update/MessageUpdateAddNugetPackageReference';
import { MessageUpdateKind } from '../../Messages/Update/MessageUpdateKind';
import { TerminalService } from '../../Terminal/TerminalService';

export class NugetPackageManagerUpdateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let updateMessage = message as unknown as IMessageUpdate;

        switch (updateMessage.messageUpdateKind) {
            case MessageUpdateKind.addNugetPackageReference:
                await this.handleMessageUpdateAddNugetPackageReference(webviewView, message);
                break;
        }
    }
    
    public static async handleMessageUpdateAddNugetPackageReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateAddNugetPackageReference;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatAddNugetPackageReferenceToProject(message.projectFile.absoluteFilePath,
                message.nugetPackageModel,
                message.nugetPackageVersionModel));

        generalUseTerminal.show();
    }
}