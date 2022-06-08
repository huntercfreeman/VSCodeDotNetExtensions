import * as vscode from 'vscode';
import { SolutionModel } from '../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { CSharpProjectFile } from '../FileSystem/Files/CSharpProjectFile';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { FileSorter } from '../FileSystem/FileSorter';
import { FileSystemReader } from '../FileSystem/FileSystemReader';
import { IdeFileFactory } from '../FileSystem/IdeFileFactory';
import { IMessage } from "../Messages/IMessage";
import { IMessageRead } from "../Messages/Read/IMessageRead";
import { MessageReadFileIntoEditor } from '../Messages/Read/MessageReadFileIntoEditor';
import { MessageReadFilesInDirectory } from '../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadKind } from "../Messages/Read/MessageReadKind";
import { MessageReadSolutionIntoTreeView } from '../Messages/Read/MessageReadSolutionIntoTreeView';
import { MessageReadSolutionsInWorkspace } from '../Messages/Read/MessageReadSolutionsInWorkspace';
import { MessageReadVirtualFilesInCSharpProject } from '../Messages/Read/MessageReadVirtualFilesInCSharpProject';

export class ReadMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.fileIntoEditor:
                await this.handleMessageReadFileIntoEditor(webviewView, message);
                break;
            case MessageReadKind.filesInDirectory:
                await this.handleMessageReadFilesInDirectory(webviewView, message);
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

        await FileSystemReader.getSiblingFiles(message.cSharpProjectFile.absoluteFilePath, (siblingFiles: string[]) => {
            siblingFiles = siblingFiles
                .filter(x => x !== message.cSharpProjectFile.absoluteFilePath.filenameWithExtension);

            let siblingAbsoluteFilePaths: AbsoluteFilePath[] = siblingFiles
                .map(x => message.cSharpProjectFile.absoluteFilePath.initialAbsoluteFilePathStringInput
                    .replace(message.cSharpProjectFile.absoluteFilePath.filenameWithExtension, x))
                .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null));

            message.cSharpProjectFile.virtualChildFiles = siblingAbsoluteFilePaths
                .map(absoluteFilePath => IdeFileFactory
                    .constructIdeFile(absoluteFilePath, message.cSharpProjectFile.absoluteFilePath));

            FileSorter.organizeContainer(message.cSharpProjectFile.virtualChildFiles);

            webviewView.webview.postMessage(message);
        });
    }
    
    public static async handleMessageReadFilesInDirectory(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadFilesInDirectory;

        await FileSystemReader.getChildFilesOfDirectory(message.directoryFile.absoluteFilePath, (childFiles: string[]) => {
            childFiles = childFiles
                .filter(x => x !== message.directoryFile.absoluteFilePath.filenameWithExtension);

            let childAbsoluteFilePaths: AbsoluteFilePath[] = childFiles
                .map(x => message.directoryFile.absoluteFilePath.initialAbsoluteFilePathStringInput
                    .replace(message.directoryFile.absoluteFilePath.filenameWithExtension, x))
                .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null));

            message.directoryFile.childFiles = childAbsoluteFilePaths
                .map(absoluteFilePath => IdeFileFactory
                    .constructIdeFile(absoluteFilePath, message.directoryFile.absoluteFilePath));

            FileSorter.organizeContainer(message.directoryFile.childFiles);

            webviewView.webview.postMessage(message);
        });
    }
    
    public static async handleMessageReadFileIntoEditor(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadFileIntoEditor;

        const openPath = vscode.Uri.file(message.ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput);

        vscode.workspace.openTextDocument(openPath).then(doc => {
            let textDocumentShowOptions: vscode.TextDocumentShowOptions = {
                "preserveFocus": false,
                "preview": false,
                "viewColumn": vscode.ViewColumn.One
            };

            vscode.window.showTextDocument(doc, textDocumentShowOptions);
        });
    }
}