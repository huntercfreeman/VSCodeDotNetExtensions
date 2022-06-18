import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../Constants/ConstantsDotNetCli';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';
import { IMessage } from "../Messages/IMessage";
import { IMessageUpdate } from "../Messages/Update/IMessageUpdate";
import { MessageUpdateExistingCSharpProjectIntoSolution } from '../Messages/Update/MessageUpdateExistingCSharpProjectIntoSolution';
import { MessageUpdateKind } from '../Messages/Update/MessageUpdateKind';
import { MessageUpdateAddProjectReference } from '../Messages/Update/MessageUpdateAddProjectReference';
import { MessageUpdateRemoveProjectReference } from '../Messages/Update/MessageUpdateRemoveProjectReference';
import { MessageUpdateAddNugetPackageReference } from '../Messages/Update/MessageUpdateAddNugetPackageReference';
import { MessageUpdateRemoveNugetPackageReference } from '../Messages/Update/MessageUpdateRemoveNugetPackageReference';
import { MessageUpdateRemoveProject } from '../Messages/Update/MessageUpdateRemoveProject';
import { MessageUpdatePutProjectInSolutionFolder } from '../Messages/Update/MessageUpdatePutProjectInSolutionFolder';

export class UpdateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let updateMessage = message as unknown as IMessageUpdate;

        switch (updateMessage.messageUpdateKind) {
            case MessageUpdateKind.existingCSharpProjectIntoSolution:
                await this.handleMessageUpdateExistingCSharpProjectIntoSolution(webviewView, message);
                break;
            case MessageUpdateKind.removeProject:
                await this.handleMessageUpdateRemoveProject(webviewView, message);
                break;
            case MessageUpdateKind.putProjectInSolutionFolder:
                await this.handleMessageUpdatePutProjectInSolutionFolder(webviewView, message);
                break;
            case MessageUpdateKind.addProjectReference:
                await this.handleMessageUpdateAddProjectReference(webviewView, message);
                break;
            case MessageUpdateKind.removeProjectReference:
                await this.handleMessageUpdateRemoveProjectReference(webviewView, message);
                break;
            case MessageUpdateKind.addNugetPackageReference:
                await this.handleMessageUpdateAddNugetPackageReference(webviewView, message);
                break;
            case MessageUpdateKind.removeNugetPackageReference:
                await this.handleMessageUpdateRemoveNugetPackageReference(webviewView, message);
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

    public static async handleMessageUpdateRemoveProject(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateRemoveProject;

        let messageUpdateTerminal = this.getMessageUpdateTerminal();

        messageUpdateTerminal.sendText(
            ConstantsDotNetCli.formatDotNetRemoveCSharpProjectFromSolutionUsingProjectUsingAbsoluteFilePath(message.cSharpProjectFile.absoluteFilePath,
                message.cSharpProjectFile.cSharpProjectModel.parentSolutionAbsoluteFilePath));

        messageUpdateTerminal.show();
    }
    
    public static async handleMessageUpdatePutProjectInSolutionFolder(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdatePutProjectInSolutionFolder;

        let messageUpdateTerminal = this.getMessageUpdateTerminal();

        let removeProjectCommand = ConstantsDotNetCli.formatDotNetRemoveCSharpProjectFromSolutionUsingProjectUsingAbsoluteFilePath(message.cSharpProjectFile.absoluteFilePath,
            message.cSharpProjectFile.cSharpProjectModel.parentSolutionAbsoluteFilePath);

        let addBackProjectButInSolutionFolderCommand = ConstantsDotNetCli.formatDotNetPutProjectInSolutionFolder(message.cSharpProjectFile.absoluteFilePath,
            message.cSharpProjectFile.cSharpProjectModel.parentSolutionAbsoluteFilePath,
            message.solutionFolderName);

        messageUpdateTerminal.sendText(removeProjectCommand + " && " +
                                       addBackProjectButInSolutionFolderCommand);

        messageUpdateTerminal.show();
    }

    public static async handleMessageUpdateAddProjectReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateAddProjectReference;

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

    public static async handleMessageUpdateRemoveProjectReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateRemoveProjectReference;

        let messageUpdateTerminal = this.getMessageUpdateTerminal();

        messageUpdateTerminal.sendText(
            ConstantsDotNetCli.formatDotNetRemoveCSharpProjectReferenceFromCSharpProject(message.cSharpProjectProjectReferenceFile.parentCSharpProjectInitialAbsoluteFilePath,
                message.cSharpProjectProjectReferenceFile.cSharpProjectReferenceAbsoluteFilePath));

        messageUpdateTerminal.show();
    }

    public static async handleMessageUpdateAddNugetPackageReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateAddNugetPackageReference;

        let messageUpdateTerminal = this.getMessageUpdateTerminal();

        messageUpdateTerminal.sendText(
            ConstantsDotNetCli.formatDotNetAddNugetPackageReferenceToCSharpProject(message.cSharpProjectFile.absoluteFilePath,
                message.nugetPackageModel,
                message.nugetPackageVersionModel));

        messageUpdateTerminal.show();
    }

    public static async handleMessageUpdateRemoveNugetPackageReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateRemoveNugetPackageReference;

        let messageUpdateTerminal = this.getMessageUpdateTerminal();

        messageUpdateTerminal.sendText(
            ConstantsDotNetCli.formatDotNetRemoveNugetPackageReferenceFromCSharpProject(message.cSharpProjectNugetPackageDependencyFile.parentCSharpProjectInitialAbsoluteFilePath,
                message.cSharpProjectNugetPackageDependencyFile.nugetPackageId));

        messageUpdateTerminal.show();
    }

    private static getMessageUpdateTerminal() {
        let messageCreateTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.MESSAGE_UPDATE_TERMINAL_NAME);

        if (!messageCreateTerminal) {
            messageCreateTerminal = vscode.window.createTerminal(ConstantsTerminal.MESSAGE_UPDATE_TERMINAL_NAME);
        }

        return messageCreateTerminal;
    }
}