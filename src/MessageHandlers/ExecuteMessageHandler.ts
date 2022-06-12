import { fstatSync } from 'fs';
import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../Constants/ConstantsDotNetCli';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';
import { IMessageExecute } from '../Messages/Execute/IMessageExecute';
import { MessageExecuteCSharpProjectWithoutDebugging } from '../Messages/Execute/MessageExecuteCSharpProjectWithoutDebugging';
import { MessageExecuteKind } from '../Messages/Execute/MessageExecuteKind';
import { IMessage } from "../Messages/IMessage";
import { MessageReadSolutionsInWorkspace } from '../Messages/Read/MessageReadSolutionsInWorkspace';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { ConstantsVSCode } from '../Constants/ConstantsVSCode';
import { ConstantsOmniSharp } from '../Constants/ConstantsOmniSharp';

const fs = require('fs');

export class ExecuteMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let executeMessage = message as unknown as IMessageExecute;

        switch (executeMessage.messageExecuteKind) {
            case MessageExecuteKind.cSharpProjectWithoutDebugging:
                await this.handleMessageExecuteCSharpProjectWithoutDebugging(webviewView, message);
                break;
            case MessageExecuteKind.cSharpProjectDebugging:
                await this.handleMessageExecuteCSharpProjectDebugging(webviewView, message);
                break;
        }
    }

    public static async handleMessageExecuteCSharpProjectWithoutDebugging(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageExecuteCSharpProjectWithoutDebugging;
        
        let messageExecuteTerminal = this.getMessageExecuteTerminal();

        messageExecuteTerminal.sendText(ConstantsDotNetCli
            .formatDotNetRunCSharpProject(message.cSharpProjectFile.absoluteFilePath));

        messageExecuteTerminal.show();
    }
    
    public static async handleMessageExecuteCSharpProjectDebugging(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageExecuteCSharpProjectWithoutDebugging;
        
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