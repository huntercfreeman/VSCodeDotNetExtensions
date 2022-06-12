import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../Constants/ConstantsDotNetCli';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';
import { IMessage } from "../Messages/IMessage";
import { IMessageUpdate } from "../Messages/Update/IMessageUpdate";
import { MessageUpdateExistingCSharpProjectIntoSolution } from '../Messages/Update/MessageUpdateExistingCSharpProjectIntoSolution';
import { MessageUpdateKind } from '../Messages/Update/MessageUpdateKind';
import { MessageUpdateProjectReferencesOfProject } from '../Messages/Update/MessageUpdateProjectReferencesOfProject';

export class UpdateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let updateMessage = message as unknown as IMessageUpdate;

        switch (updateMessage.messageUpdateKind) {
            case MessageUpdateKind.existingCSharpProjectIntoSolution:
                await this.handleMessageUpdateExistingCSharpProjectIntoSolution(webviewView, message);
                break;
            case MessageUpdateKind.projectReferencesOfProject:
                await this.handleMessageUpdateProjectReferencesOfProject(webviewView, message);
                break;
        }
    }

    public static async handleMessageUpdateExistingCSharpProjectIntoSolution(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateExistingCSharpProjectIntoSolution;

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Existing C# Project',
            canSelectFiles: true,
            canSelectFolders: false
        };

        vscode.window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
                console.log('Selected file: ' + fileUri[0].fsPath);

                let messageUpdateTerminal = this.getMessageUpdateTerminal();

                messageUpdateTerminal.sendText(
                    ConstantsDotNetCli.formatDotNetAddCSharpProjectToSolutionUsingProjectFsPath(fileUri[0].fsPath,
                        message.dotNetSolutionFile));

                messageUpdateTerminal.show();
            }
        });
    }
    
    public static async handleMessageUpdateProjectReferencesOfProject(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateProjectReferencesOfProject;

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Existing C# Project',
            canSelectFiles: true,
            canSelectFolders: false
        };

        vscode.window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
                let messageUpdateTerminal = this.getMessageUpdateTerminal();

                messageUpdateTerminal.sendText(
                    ConstantsDotNetCli.formatDotNetAddCSharpProjectReferenceToCSharpProject(message.cSharpProjectProjectReferencesFile.parentCSharpProjectInitialAbsoluteFilePath, 
                        fileUri[0].fsPath));

                messageUpdateTerminal.show();
            }
        });
    }

    private static getMessageUpdateTerminal() {
        let messageCreateTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.MESSAGE_UPDATE_TERMINAL_NAME);

        if (!messageCreateTerminal) {
            messageCreateTerminal = vscode.window.createTerminal(ConstantsTerminal.MESSAGE_UPDATE_TERMINAL_NAME);
        }

        return messageCreateTerminal;
    }
}