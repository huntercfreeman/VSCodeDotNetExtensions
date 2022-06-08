import * as vscode from 'vscode';
import { SolutionModel } from '../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { IMessage } from "../Messages/IMessage";
import { IMessageRead } from "../Messages/Read/IMessageRead";
import { MessageReadKind } from "../Messages/Read/MessageReadKind";
import { MessageReadSolutionsInWorkspace } from '../Messages/Read/MessageReadSolutionsInWorkspace';

export class ReadMessageHandler {
    public static handleMessage(webviewView: vscode.WebviewView, message: IMessage): void {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.fileIntoEditor:
                break;
            case MessageReadKind.filesInDirectory:
                break;
            case MessageReadKind.solutionIntoTreeView:
                break;
            case MessageReadKind.solutionsInWorkspace:
                this.handleMessageReadSolutionsInWorkspaceAsync(webviewView, message);
                break;
        }
    }

    public static async handleMessageReadSolutionsInWorkspaceAsync(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadSolutionsInWorkspace;

        let workspaceFolderAbsolutePath: string;

        let workspaceFolderFsPaths = vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath);

        if (workspaceFolderFsPaths === null ||
            workspaceFolderFsPaths === undefined ||
            workspaceFolderFsPaths.length === 0) {
            return;
        }
        else {
            workspaceFolderAbsolutePath = workspaceFolderFsPaths[0];
        }

        if (!workspaceFolderAbsolutePath) {
            vscode.window.showInformationMessage('No files in empty workspace');
        }

        let solutionFsPaths = (await vscode.workspace.findFiles("**/*.sln"))
            .map(x => x.fsPath);

        if (solutionFsPaths.length === 0) {
            vscode.window.showErrorMessage("No .sln files were found within workspace");
            return;
        }

        solutionFsPaths.sort((solutionOne, solutionTwo) => {
            return solutionOne.localeCompare(solutionTwo);
        });

        let solutionAbsoluteFilePaths = solutionFsPaths
            .map(x => new AbsoluteFilePath(x, false, null, null));

        let solutionModels = solutionAbsoluteFilePaths
            .map(x => new SolutionModel(x));

        message.dotNetSolutionFiles = solutionModels
            .map(x => new DotNetSolutionFile(x.absoluteFilePath));

        webviewView.webview.postMessage(message);
    }
}