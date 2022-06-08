import * as vscode from 'vscode';
import { SolutionModel } from '../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { CSharpProjectFile } from '../FileSystem/Files/CSharpProjectFile';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { IMessage } from "../Messages/IMessage";
import { IMessageRead } from "../Messages/Read/IMessageRead";
import { MessageReadKind } from "../Messages/Read/MessageReadKind";
import { MessageReadSolutionIntoTreeView } from '../Messages/Read/MessageReadSolutionIntoTreeView';
import { MessageReadSolutionsInWorkspace } from '../Messages/Read/MessageReadSolutionsInWorkspace';
import { MessageReadVirtualFilesInCSharpProject } from '../Messages/Read/MessageReadVirtualFilesInCSharpProject';

export class ReadMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.fileIntoEditor:
                break;
            case MessageReadKind.filesInDirectory:
                break;
            case MessageReadKind.virtualFilesInCSharpProject:
                await this.handleMessageReadVirtualFilesInCSharpProjectAsync(webviewView, message);
                break;
            case MessageReadKind.solutionIntoTreeView:
                await this.handleMessageReadSolutionIntoTreeViewAsync(webviewView, message);
                break;
            case MessageReadKind.solutionsInWorkspace:
                await this.handleMessageReadSolutionsInWorkspaceAsync(webviewView, message);
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
            .map(x => new AbsoluteFilePath(x, false, null));

        let solutionModels = solutionAbsoluteFilePaths
            .map(x => new SolutionModel(x));

        message.dotNetSolutionFiles = solutionModels
            .map(x => new DotNetSolutionFile(x));

        webviewView.webview.postMessage(message);
    }

    public static async handleMessageReadSolutionIntoTreeViewAsync(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadSolutionIntoTreeView;

        return await SolutionModel.parseSolution(message.dotNetSolutionFile.solutionModel!, () => {
            message.dotNetSolutionFile.virtualChildFiles = message.dotNetSolutionFile.solutionModel!.projects
                .map(x => new CSharpProjectFile(x));
            
            webviewView.webview.postMessage(message);
        });
    }
    
    public static async handleMessageReadVirtualFilesInCSharpProjectAsync(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadVirtualFilesInCSharpProject;

        console.log(message);
    }
}