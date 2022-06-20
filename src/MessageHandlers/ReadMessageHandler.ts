import * as vscode from 'vscode';
import { ActiveDotNetSolutionFileContainer } from '../ActiveDotNetSolutionFileContainer';
import { ConstantsDotNetCli } from '../Constants/ConstantsDotNetCli';
import { ConstantsFilePath } from '../Constants/ConstantsFilePath';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';
import { CSharpProjectModel } from '../DotNet/CSharpProjectModel';
import { ProjectKind } from '../DotNet/ProjectKind';
import { SolutionFolderModel } from '../DotNet/SolutionFolderModel';
import { SolutionModel } from '../DotNet/SolutionModel';
import { VCXProjectModel } from '../DotNet/VCXProjectModel';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { FileKind } from '../FileSystem/FileKind';
import { VCXProjectFile } from '../FileSystem/Files/CPlusPlus/VCXProjectFile';
import { CSharpProjectFile } from '../FileSystem/Files/CSharp/CSharpProjectFile';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { SolutionFolderFile } from '../FileSystem/Files/SolutionFolderFile';
import { FileSorter } from '../FileSystem/FileSorter';
import { FileSystemReader } from '../FileSystem/FileSystemReader';
import { IdeFileFactory } from '../FileSystem/IdeFileFactory';
import { IMessage } from "../Messages/IMessage";
import { IMessageRead } from "../Messages/Read/IMessageRead";
import { MessageReadActiveDotNetSolutionFile } from '../Messages/Read/MessageReadActiveDotNetSolutionFile';
import { MessageReadFileIntoEditor } from '../Messages/Read/MessageReadFileIntoEditor';
import { MessageReadFilesInDirectory } from '../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadKind } from "../Messages/Read/MessageReadKind";
import { MessageReadNewProjectTemplatesOnComputer } from '../Messages/Read/MessageReadNewProjectTemplatesOnComputer';
import { MessageReadNugetPackageReferencesInProject } from '../Messages/Read/MessageReadNugetPackageReferencesInProject';
import { MessageReadProjectIntoXmlEditor } from '../Messages/Read/MessageReadProjectIntoXmlEditor';
import { MessageReadProjectReferencesInProject } from '../Messages/Read/MessageReadProjectReferencesInProject';
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
            case MessageReadKind.activeDotNetSolutionFile:
                await this.handleMessageReadActiveDotNetSolutionFile(webviewView, message);
                break;
            case MessageReadKind.projectReferencesInProject:
                await this.handleMessageReadProjectReferencesInProjectAsync(webviewView, message);
                break;
            case MessageReadKind.nugetPackageReferencesInProject:
                await this.handleMessageReadNugetPackageReferencesInProject(webviewView, message);
                break;
            case MessageReadKind.virtualFilesInSolution:
                await this.handleMessageReadVirtualFilesInSolution(webviewView, message);
                break;
            case MessageReadKind.solutionsInWorkspace:
                await this.handleMessageReadSolutionsInWorkspaceAsync(webviewView, message);
                break;
            case MessageReadKind.newProjectTemplatesOnComputer:
                await this.handleMessageReadNewProjectTemplatesOnComputer(webviewView, message);
                break;
            case MessageReadKind.projectIntoXmlEditor:
                await this.handleMessageReadProjectIntoXmlEditor(webviewView, message);
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
            return;
        }

        let solutionFsPaths = (await vscode.workspace.findFiles("**/*.sln"))
            .map(x => x.fsPath);

        if (solutionFsPaths.length === 0) {
            vscode.window.showErrorMessage("No .sln files were found within workspace");
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

            ActiveDotNetSolutionFileContainer.setActiveDotNetSolutionFile(undefined);

        webviewView.webview.postMessage(message);
    }

    public static async handleMessageReadSolutionIntoTreeViewAsync(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadSolutionIntoTreeView;

        return await SolutionModel.parseSolution(message.dotNetSolutionFile, async () => {

            let parsedRootNamespaces = [];

            for (let i = 0; i < message.dotNetSolutionFile.solutionModel!.projects.length; i++) {

                let projectModel = message.dotNetSolutionFile.solutionModel!.projects[i];

                if (projectModel.projectKind === ProjectKind.solutionFolder) {
                    parsedRootNamespaces.push(1);
                }
                else {
                    parsedRootNamespaces.push(0);

                    await CSharpProjectModel.parseRootNamespace(projectModel as CSharpProjectModel,
                        () => parsedRootNamespaces[i] = 1);
                }
            }

            // The parsing of the root namespaces takes a callback for when the parsing is done
            // this works for parsing one file at a time but parsing more than one file
            // it does not work and finishedParsingRootNamespacesOfProjects should be removed
            // eventually this is a short term hack.
            //
            // "There's no code more permanent than a temporary hack" - Abraham Lincoln
            await this.finishedParsingRootNamespacesOfProjects(parsedRootNamespaces);

            message.dotNetSolutionFile.virtualChildFiles = message.dotNetSolutionFile.solutionModel!.projects
                .map(x => {
                    switch (x.projectKind) {
                        case ProjectKind.solutionFolder:
                            return new SolutionFolderFile(x as SolutionFolderModel);
                        case ProjectKind.cSharpProject:
                            return new CSharpProjectFile(x as CSharpProjectModel);
                        case ProjectKind.vcxProject:
                            return new VCXProjectFile(x as VCXProjectModel);
                        default:
                            throw Error(`The projectKind of ${x.projectKind} is not currently supported.`);
                    }
                });

            ActiveDotNetSolutionFileContainer.setActiveDotNetSolutionFile(message.dotNetSolutionFile);

            webviewView.webview.postMessage(message);
        });
    }

    public static async handleMessageReadActiveDotNetSolutionFile(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadActiveDotNetSolutionFile;

        ActiveDotNetSolutionFileContainer.notifySubscriptions();

        webviewView.webview.postMessage(message);
    }

    public static async handleMessageReadProjectReferencesInProjectAsync(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadProjectReferencesInProject;

        return await CSharpProjectModel.parseCSharpProjectProjectReferences(message.cSharpProjectProjectReferencesFile.parentCSharpProjectInitialAbsoluteFilePath,
            message.cSharpProjectProjectReferencesFile, () => {

                webviewView.webview.postMessage(message);
            });
    }

    public static async handleMessageReadNugetPackageReferencesInProject(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadNugetPackageReferencesInProject;

        return await CSharpProjectModel.parseCSharpProjectNugetPackageReferences(message.cSharpProjectNugetPackageDependenciesFile.parentCSharpProjectInitialAbsoluteFilePath,
            message.cSharpProjectNugetPackageDependenciesFile, () => {

                webviewView.webview.postMessage(message);
            });
    }

    public static async handleMessageReadVirtualFilesInSolution(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadSolutionIntoTreeView;

        return await SolutionModel.parseSolution(message.dotNetSolutionFile, () => {
            message.dotNetSolutionFile.virtualChildFiles = message.dotNetSolutionFile.solutionModel!.projects
                .map(x => {
                    switch (x.projectKind) {
                        case ProjectKind.solutionFolder:
                            return new SolutionFolderFile(x as SolutionFolderModel);
                        case ProjectKind.cSharpProject:
                            return new CSharpProjectFile(x as CSharpProjectModel);
                        case ProjectKind.vcxProject:
                            return new VCXProjectFile(x as VCXProjectModel);
                        default:
                            throw Error(`The projectKind of ${x.projectKind} is not currently supported.`);
                    }
                });

            ActiveDotNetSolutionFileContainer.setActiveDotNetSolutionFile(message.dotNetSolutionFile);
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
                    .constructIdeFile(absoluteFilePath, message.cSharpProjectFile.namespace));

            message.cSharpProjectFile.virtualChildFiles = FileSorter.organizeContainer(message.cSharpProjectFile.virtualChildFiles);

            for (let i = 0; i < message.cSharpProjectFile.virtualChildFiles.length; i++) {
                let file = message.cSharpProjectFile.virtualChildFiles[i];

                file.setVirtualChildFiles(message.cSharpProjectFile.virtualChildFiles);
            }

            webviewView.webview.postMessage(message);
        });
    }

    public static async handleMessageReadFilesInDirectory(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadFilesInDirectory;

        await FileSystemReader.getChildFilesOfDirectory(message.directoryFile.absoluteFilePath, (childFiles: string[]) => {
            childFiles = childFiles
                .filter(x => x !== message.directoryFile.absoluteFilePath.filenameWithExtension);

            let childAbsoluteFilePaths: AbsoluteFilePath[] = childFiles
                .map(x => message.directoryFile.absoluteFilePath.initialAbsoluteFilePathStringInput +
                    ConstantsFilePath.STANDARDIZED_FILE_DELIMITER +
                    x)
                .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null));

            message.directoryFile.childFiles = childAbsoluteFilePaths
                .map(absoluteFilePath => IdeFileFactory
                    .constructIdeFile(absoluteFilePath, message.directoryFile.namespace));

            message.directoryFile.childFiles = FileSorter.organizeContainer(message.directoryFile.childFiles);

            for (let i = 0; i < message.directoryFile.childFiles.length; i++) {
                let file = message.directoryFile.childFiles[i];

                file.setVirtualChildFiles(message.directoryFile.childFiles);
            }

            webviewView.webview.postMessage(message);
        });
    }

    public static async handleMessageReadFileIntoEditor(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadFileIntoEditor;

        const openPath = vscode.Uri.file(message.ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput);

        switch (message.ideFile.fileKind) {
            case FileKind.directory:
                // TODO: Track the clicked directory in vscode folder explorer I did not get this to work yet.
                // vscode.window.showTextDocument(vscode.Uri.from(openPath));
                break;
            default:
                vscode.workspace.openTextDocument(openPath).then(doc => {
                    let textDocumentShowOptions: vscode.TextDocumentShowOptions = {
                        "preserveFocus": false,
                        "preview": false,
                        "viewColumn": vscode.ViewColumn.One
                    };

                    vscode.window.showTextDocument(doc, textDocumentShowOptions);
                });
                break;
        }
    }

    public static async handleMessageReadNewProjectTemplatesOnComputer(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadNewProjectTemplatesOnComputer;

        let messageExecuteTerminal = this.getMessageReadTerminal();

        messageExecuteTerminal.sendText(ConstantsDotNetCli.DOT_NET_NEW_LIST);

        messageExecuteTerminal.show();
    }
    
    public static async handleMessageReadProjectIntoXmlEditor(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadProjectIntoXmlEditor;

        const panel = vscode.window.createWebviewPanel(
            'dot-net-ide.xml-editor', // Identifies the type of the webview. Used internally
            'XML Editor', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {
                enableScripts: true,
                
            } // Webview options. More on these later.
          );
    }

    private static getMessageReadTerminal() {
        let messageReadTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.MESSAGE_READ_TERMINAL_NAME);

        if (!messageReadTerminal) {
            messageReadTerminal = vscode.window.createTerminal(ConstantsTerminal.MESSAGE_READ_TERMINAL_NAME);
        }

        return messageReadTerminal;
    }

    private static async finishedParsingRootNamespacesOfProjects(finishedMarkers: number[]) {
        let timeoutInMiliseconds = 500;
        let maximumLoopCount = 12000;

        // 1 hour timeout should never happen only a precaution

        let loopCount = 0;

        let sawUnfininshedCallback = false;

        for (; ;) {

            sawUnfininshedCallback = false;

            for (let i = 0; i < finishedMarkers.length; i++) {
                if (finishedMarkers[i] === 0) {
                    sawUnfininshedCallback = true;
                }
            }

            ++loopCount;

            if (!sawUnfininshedCallback || (loopCount >= maximumLoopCount)) {
                break;
            }

            await new Promise(r => setTimeout(r, timeoutInMiliseconds));
        }
    }
}