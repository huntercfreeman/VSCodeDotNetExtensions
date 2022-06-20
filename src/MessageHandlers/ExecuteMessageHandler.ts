import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../Constants/ConstantsDotNetCli';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';
import { IMessageExecute } from '../Messages/Execute/IMessageExecute';
import { MessageExecuteProjectWithoutDebugging } from '../Messages/Execute/MessageExecuteProjectWithoutDebugging';
import { MessageExecuteKind } from '../Messages/Execute/MessageExecuteKind';
import { IMessage } from "../Messages/IMessage";
import { ConstantsOmniSharp } from '../Constants/ConstantsOmniSharp';

const fs = require('fs');

export class ExecuteMessageHandler {
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

        let messageExecuteTerminal = this.getMessageExecuteTerminal();

        messageExecuteTerminal.sendText(ConstantsDotNetCli
            .formatDotNetRunCSharpProject(message.projectModel.absoluteFilePath));

        messageExecuteTerminal.show();
    }

    public static async handleMessageExecuteProjectDebugging(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageExecuteProjectWithoutDebugging;

        vscode.commands.executeCommand(ConstantsOmniSharp.OMNI_SHARP_GENERATE_ASSETS);
    }

    private static getMessageExecuteTerminal() {
        let messageExecuteTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.MESSAGE_EXECUTE_TERMINAL_NAME);

        if (!messageExecuteTerminal) {
            messageExecuteTerminal = vscode.window.createTerminal(ConstantsTerminal.MESSAGE_EXECUTE_TERMINAL_NAME);
        }

        return messageExecuteTerminal;
    }
}