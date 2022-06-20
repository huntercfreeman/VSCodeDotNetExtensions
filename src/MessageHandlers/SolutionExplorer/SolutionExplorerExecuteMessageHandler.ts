import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../../Constants/ConstantsDotNetCli';
import { ConstantsOmniSharp } from '../../Constants/ConstantsOmniSharp';
import { ProjectKind } from '../../DotNet/ProjectKind';
import { IMessageExecute } from '../../Messages/Execute/IMessageExecute';
import { MessageExecuteKind } from '../../Messages/Execute/MessageExecuteKind';
import { MessageExecuteProjectWithoutDebugging } from '../../Messages/Execute/MessageExecuteProjectWithoutDebugging';
import { IMessage } from '../../Messages/IMessage';
import { TerminalService } from '../../Terminal/TerminalService';

const fs = require('fs');

export class SolutionExplorerExecuteMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let executeMessage = message as unknown as IMessageExecute;

        switch (executeMessage.messageExecuteKind) {
            case MessageExecuteKind.projectWithoutDebugging:
                await this.handleMessageExecuteProjectWithoutDebugging(webviewView, message);
                break;
            case MessageExecuteKind.projectDebugging:
                await this.handleMessageExecuteProjectDebugging(webviewView, message);
                break;
        }
    }

    public static async handleMessageExecuteProjectWithoutDebugging(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageExecuteProjectWithoutDebugging;

        let programExecutionTerminal = TerminalService.getProgramExecutionTerminal();

        if (message.projectModel.projectKind === ProjectKind.cSharpProject) {
            programExecutionTerminal.sendText(ConstantsDotNetCli
                .formatDotNetRunCSharpProject(message.projectModel.absoluteFilePath));
        }
        else if ((message.projectModel as any).vcxProjectModel) {
            // TODO: Start .vcx project without debugging
        }

        programExecutionTerminal.show();
    }

    public static async handleMessageExecuteProjectDebugging(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageExecuteProjectWithoutDebugging;

        vscode.commands.executeCommand(ConstantsOmniSharp.OMNI_SHARP_GENERATE_ASSETS);
    }
}