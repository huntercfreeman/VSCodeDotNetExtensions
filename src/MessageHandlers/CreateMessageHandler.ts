import * as vscode from 'vscode';
import { AsyncUtility } from '../AsyncUtility/AsyncUtility';
import { ConstantsDotNetCli } from '../Constants/ConstantsDotNetCli';
import { ConstantsFilePath } from '../Constants/ConstantsFilePath';
import { ConstantsFileTemplates } from '../Constants/ConstantsFileTemplates';
import { ConstantsTerminal } from '../Constants/ConstantsTerminal';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { FileKind } from '../FileSystem/FileKind';
import { CSharpProjectFile } from '../FileSystem/Files/CSharpProjectFile';
import { DefaultFile } from '../FileSystem/Files/DefaultFile';
import { DirectoryFile } from '../FileSystem/Files/DirectoryFile';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { IdeFileFactory } from '../FileSystem/IdeFileFactory';
import { IMessageCreate } from "../Messages/Create/IMessageCreate";
import { MessageCreateCSharpProjectInAny } from '../Messages/Create/MessageCreateCSharpProjectInAny';
import { MessageCreateDirectoryInAny } from '../Messages/Create/MessageCreateDirectoryInAny';
import { MessageCreateDotNetSolutionInWorkspace } from '../Messages/Create/MessageCreateDotNetSolutionInWorkspace';
import { MessageCreateEmptyFileInAny } from '../Messages/Create/MessageCreateEmptyFileInAny';
import { MessageCreateKind } from "../Messages/Create/MessageCreateKind";
import { MessageCreateSolutionFolderInAny } from '../Messages/Create/MessageCreateSolutionFolderInAny';
import { MessageCreateTemplatedFileInAny } from '../Messages/Create/MessageCreateTemplatedFileInAny';
import { IMessage } from "../Messages/IMessage";
import { MessageReadFilesInDirectory } from '../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadSolutionIntoTreeView } from '../Messages/Read/MessageReadSolutionIntoTreeView';
import { MessageReadVirtualFilesInCSharpProject } from '../Messages/Read/MessageReadVirtualFilesInCSharpProject';
import { MessageReadVirtualFilesInSolution } from '../Messages/Read/MessageReadVirtualFilesInSolution';
import { SolutionExplorerMessageHandler } from './SolutionExplorerMessageHandler';

const fs = require('fs');

export class CreateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let createMessage = message as unknown as IMessageCreate;

        switch (createMessage.messageCreateKind) {
            case MessageCreateKind.dotNetSolutionInWorkspace:
                await this.handleMessageCreateDotNetSolutionInWorkspace(webviewView, message);
                break;
            case MessageCreateKind.emptyFileInDirectory:
                this.handleMessageCreateEmptyFileInAny(webviewView, message);
                break;
            case MessageCreateKind.cSharpProjectInAny:
                await this.handleMessageCreateCSharpProjectInAny(webviewView, message);
                break;
            case MessageCreateKind.projectInSolutionFolder:
                break;
            case MessageCreateKind.solutionFolderInAny:
                await this.handleMessageCreateSolutionFolder(webviewView, message);
                break;
            case MessageCreateKind.directoryInAny:
                await this.handleMessageCreateDirectoryInAny(webviewView, message);
                break;
            case MessageCreateKind.templatedFileInAny:
                await this.handleMessageCreateTemplatedFileInAny(webviewView, message);
                break;
        }
    }

    public static async handleMessageCreateDotNetSolutionInWorkspace(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateDotNetSolutionInWorkspace;

        let messageExecuteTerminal = this.getMessageCreateTerminal();

        messageExecuteTerminal.sendText(ConstantsDotNetCli
            .formatDotNetNewSolution(message.solutionNameWithoutExtension));

        messageExecuteTerminal.show();
    }

    public static async handleMessageCreateTemplatedFileInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateTemplatedFileInAny;

        let writePath: string = "";

        switch (message.ideFile.fileKind) {
            case FileKind.cSharpProject:
                writePath =
                    message.ideFile.absoluteFilePath
                        .parentDirectories[
                            message.ideFile.absoluteFilePath
                            .parentDirectories.length - 1
                    ].initialAbsoluteFilePathStringInput;

                break;
            case FileKind.directory:
                writePath = message
                    .ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput;
                
                break;
        }

        if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
            writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }

        writePath += message.filenameWithExtension;

        let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        let templatedIdeFile = IdeFileFactory.constructIdeFile(absoluteFilePath, message.ideFile.namespace);

        fs.writeFile(writePath,
            ConstantsFileTemplates.getFileTemplate(templatedIdeFile),
            { flag: 'a+' },
            (err: any) => {
                if (!err) {

                    switch (message.ideFile.fileKind) {
                        case FileKind.cSharpProject:
                            if(!message.ideFile.virtualChildFiles) {
                                message.ideFile.virtualChildFiles = [];
                            }
                            
                            message.ideFile.virtualChildFiles.push(templatedIdeFile);

                            SolutionExplorerMessageHandler
                                .handleMessage(
                                    webviewView,
                                    new MessageReadVirtualFilesInCSharpProject(
                                        message.ideFile as CSharpProjectFile
                                    ));

                            break;
                        case FileKind.directory:
                            if (!message.ideFile.childFiles) {
                                message.ideFile.childFiles = [];
                            }

                            message.ideFile.childFiles.push(templatedIdeFile);

                            SolutionExplorerMessageHandler
                                .handleMessage(
                                    webviewView,
                                    new MessageReadFilesInDirectory(
                                        message.ideFile as DirectoryFile
                                    ));
                            
                            break;
                    }

                    const openPath = vscode.Uri.file(absoluteFilePath.initialAbsoluteFilePathStringInput);

                    vscode.workspace.openTextDocument(openPath).then(doc => {
                        let textDocumentShowOptions: vscode.TextDocumentShowOptions = {
                            "preserveFocus": false,
                            "preview": false,
                            "viewColumn": vscode.ViewColumn.One
                        };

                        vscode.window.showTextDocument(doc, textDocumentShowOptions);
                    });
                }
            });
    }
    
    public static async handleMessageCreateEmptyFileInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateEmptyFileInAny;

        let writePath: string = "";

        switch (message.ideFile.fileKind) {
            case FileKind.cSharpProject:
                writePath =
                    message.ideFile.absoluteFilePath
                        .parentDirectories[
                            message.ideFile.absoluteFilePath
                            .parentDirectories.length - 1
                    ].initialAbsoluteFilePathStringInput;

                break;
            case FileKind.directory:
                writePath = message
                    .ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput;
                
                break;
        }

        if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
            writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }

        writePath += message.filenameWithExtension;

        let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        let defaultFile = new DefaultFile(absoluteFilePath);

        fs.writeFile(writePath,
            "",
            { flag: 'a+' },
            (err: any) => {
                if (!err) {

                    switch (message.ideFile.fileKind) {
                        case FileKind.cSharpProject:
                            if(!message.ideFile.virtualChildFiles) {
                                message.ideFile.virtualChildFiles = [];
                            }
                            
                            message.ideFile.virtualChildFiles.push(defaultFile);

                            SolutionExplorerMessageHandler
                                .handleMessage(
                                    webviewView,
                                    new MessageReadVirtualFilesInCSharpProject(
                                        message.ideFile as CSharpProjectFile
                                    ));

                            break;
                        case FileKind.directory:
                            if (!message.ideFile.childFiles) {
                                message.ideFile.childFiles = [];
                            }

                            message.ideFile.childFiles.push(defaultFile);

                            SolutionExplorerMessageHandler
                                .handleMessage(
                                    webviewView,
                                    new MessageReadFilesInDirectory(
                                        message.ideFile as DirectoryFile
                                    ));
                            
                            break;
                    }

                    const openPath = vscode.Uri.file(absoluteFilePath.initialAbsoluteFilePathStringInput);

                    vscode.workspace.openTextDocument(openPath).then(doc => {
                        let textDocumentShowOptions: vscode.TextDocumentShowOptions = {
                            "preserveFocus": false,
                            "preview": false,
                            "viewColumn": vscode.ViewColumn.One
                        };

                        vscode.window.showTextDocument(doc, textDocumentShowOptions);
                    });
                }
            });
    }

    public static async handleMessageCreateDirectoryInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateDirectoryInAny;

        let writePath: string = "";

        switch (message.ideFile.fileKind) {
            case FileKind.cSharpProject:
                writePath =
                    message.ideFile.absoluteFilePath
                        .parentDirectories[
                            message.ideFile.absoluteFilePath
                            .parentDirectories.length - 1
                    ].initialAbsoluteFilePathStringInput;

                break;
            case FileKind.directory:
                writePath = message
                    .ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput;
                
                break;
        }

        if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
            writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }

        writePath += message.filenameWithExtension;

        let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        let templatedIdeFile = IdeFileFactory.constructIdeFile(absoluteFilePath, message.ideFile.namespace);

        fs.mkdir(templatedIdeFile.absoluteFilePath.initialAbsoluteFilePathStringInput, { recursive: true }, (err: any) => {
            if (!err) {

                switch (message.ideFile.fileKind) {
                    case FileKind.cSharpProject:
                        if(!message.ideFile.virtualChildFiles) {
                            message.ideFile.virtualChildFiles = [];
                        }
                        
                        message.ideFile.virtualChildFiles.push(templatedIdeFile);

                        SolutionExplorerMessageHandler
                            .handleMessage(
                                webviewView,
                                new MessageReadVirtualFilesInCSharpProject(
                                    message.ideFile as CSharpProjectFile
                                ));

                        break;
                    case FileKind.directory:
                        if (!message.ideFile.childFiles) {
                            message.ideFile.childFiles = [];
                        }

                        message.ideFile.childFiles.push(templatedIdeFile);

                        SolutionExplorerMessageHandler
                            .handleMessage(
                                webviewView,
                                new MessageReadFilesInDirectory(
                                    message.ideFile as DirectoryFile
                                ));
                        
                        break;
                }
            }
        });
    }

    public static async handleMessageCreateCSharpProjectInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateCSharpProjectInAny;

        let dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath | undefined;

        let solutionFolder: CSharpProjectFile | undefined;

        if (message.ideFile.fileKind === FileKind.solution) {
            let dotNetSolutionFile = message.ideFile as DotNetSolutionFile;

            dotNetSolutionFileAbsoluteFilePath = dotNetSolutionFile.absoluteFilePath;
        }
        else if (message.ideFile.fileKind === FileKind.solutionFolder) {
            solutionFolder = message.ideFile as CSharpProjectFile;

            dotNetSolutionFileAbsoluteFilePath = solutionFolder.cSharpProjectModel.parentSolutionAbsoluteFilePath;
        }

        let messageCreateTerminal = this.getMessageCreateTerminal();

        messageCreateTerminal.sendText(
            ConstantsDotNetCli.formatDotNetNewCSharpProject(message.cSharpProjectNameNoExtension, message.templateName) +
            ` ${ConstantsTerminal.TERMINAL_RUN_IF_PREVIOUS_COMMAND_SUCCESSFUL_OPERATOR} ` +
            ConstantsDotNetCli.formatDotNetAddCSharpProjectToSolutionUsingProjectName(message.cSharpProjectNameNoExtension, dotNetSolutionFileAbsoluteFilePath!));

        messageCreateTerminal.show();

        if (solutionFolder) {
            // TODO: Add csproj to solution folder in .sln file
            var z = 2;
        }
    }

    public static async handleMessageCreateSolutionFolder(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateSolutionFolderInAny;

        let dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath | undefined;

        let solutionFolder: CSharpProjectFile | undefined;

        if (message.ideFile.fileKind === FileKind.solution) {
            let dotNetSolutionFile = message.ideFile as DotNetSolutionFile;

            dotNetSolutionFileAbsoluteFilePath = dotNetSolutionFile.absoluteFilePath;
        }
        else if (message.ideFile.fileKind === FileKind.solutionFolder) {
            solutionFolder = message.ideFile as CSharpProjectFile;

            dotNetSolutionFileAbsoluteFilePath = solutionFolder.cSharpProjectModel.parentSolutionAbsoluteFilePath;
        }

        // TODO: Tried to add solution folder using dotnet cli
        // however you cannot within reason add an empty solution folder
        // using the cli. Within reason referring to it was very hacky.
        // In short, you must at all times have a .csproj file within the solution folder.
        // So, I made an empty csproj to act as a temporary .csproj so I was allowed to make
        // the solution folder. Then I deleted the csproj but it also
        // would delete the solution folder cause now it was empty so I gotta
        // revisit this.

        if (solutionFolder) {
            // TODO: Add create solution folder within solution folder.
            var z = 2;
        }
    }

    private static getMessageCreateTerminal() {
        let messageCreateTerminal = vscode.window.terminals.find(x => x.name === ConstantsTerminal.MESSAGE_CREATE_TERMINAL_NAME);

        if (!messageCreateTerminal) {
            messageCreateTerminal = vscode.window.createTerminal(ConstantsTerminal.MESSAGE_CREATE_TERMINAL_NAME);
        }

        return messageCreateTerminal;
    }
}