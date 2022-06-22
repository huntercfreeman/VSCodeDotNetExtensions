import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../../Constants/ConstantsDotNetCli';
import { ConstantsFilePath } from '../../Constants/ConstantsFilePath';
import { ConstantsFileTemplates } from '../../Constants/ConstantsFileTemplates';
import { ConstantsTerminal } from '../../Constants/ConstantsTerminal';
import { AbsoluteFilePath } from '../../FileSystem/AbsoluteFilePath';
import { FileKind } from '../../FileSystem/FileKind';
import { CSharpProjectFile } from '../../FileSystem/Files/CSharp/CSharpProjectFile';
import { DefaultFile } from '../../FileSystem/Files/DefaultFile';
import { DirectoryFile } from '../../FileSystem/Files/DirectoryFile';
import { DotNetSolutionFile } from '../../FileSystem/Files/DotNetSolutionFile';
import { IdeFileFactory } from '../../FileSystem/IdeFileFactory';
import { IMessage } from '../../Messages/IMessage';
import { IMessageCreate } from '../../Messages/Create/IMessageCreate';
import { MessageCreateCSharpProjectInAny } from '../../Messages/Create/MessageCreateCSharpProjectInAny';
import { MessageCreateDirectoryInAny } from '../../Messages/Create/MessageCreateDirectoryInAny';
import { MessageCreateDotNetSolutionInWorkspace } from '../../Messages/Create/MessageCreateDotNetSolutionInWorkspace';
import { MessageCreateEmptyFileInAny } from '../../Messages/Create/MessageCreateEmptyFileInAny';
import { MessageCreateKind } from '../../Messages/Create/MessageCreateKind';
import { MessageCreateTemplatedFileInAny } from '../../Messages/Create/MessageCreateTemplatedFileInAny';
import { TerminalService } from '../../Terminal/TerminalService';
import { SolutionExplorerMessageTransporter } from './SolutionExplorerMessageTransporter';
import { MessageReadFilesInDirectory } from '../../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadVirtualFilesInCSharpProject } from '../../Messages/Read/MessageReadVirtualFilesInCSharpProject';
import { FSharpProjectFile } from '../../FileSystem/Files/FSharp/FSharpProjectFile';
import { MessageReadVirtualFilesInFSharpProject } from '../../Messages/Read/MessageReadVirtualFilesInFSharpProject';
import { MessageCreateFSharpProjectInAny } from '../../Messages/Create/MessageCreateFSharpProjectInAny';

const fs = require('fs');

export class SolutionExplorerCreateMessageHandler {
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
            case MessageCreateKind.fSharpProjectInAny:
                await this.handleMessageCreateFSharpProjectInAny(webviewView, message);
                break;
            case MessageCreateKind.projectInSolutionFolder:
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

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(ConstantsDotNetCli
            .formatDotNetNewSolution(message.solutionNameWithoutExtension));

        generalUseTerminal.show();
    }

    public static async handleMessageCreateTemplatedFileInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateTemplatedFileInAny;

        let writePath: string = "";

        if (message.ideFile.fileKind === FileKind.directory) {
            writePath = message
                .ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput;
        }
        else if ((message.ideFile as any).projectModel) {
            writePath =
                message.ideFile.absoluteFilePath
                    .parentDirectories[
                    message.ideFile.absoluteFilePath
                        .parentDirectories.length - 1
                ].initialAbsoluteFilePathStringInput;
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

                    if (message.ideFile.fileKind === FileKind.directory) {
                        if (!message.ideFile.childFiles) {
                            message.ideFile.childFiles = [];
                        }

                        message.ideFile.childFiles.push(templatedIdeFile);

                        SolutionExplorerMessageTransporter
                            .transportMessage(
                                webviewView,
                                new MessageReadFilesInDirectory(
                                    message.ideFile as DirectoryFile
                                ));
                    }
                    else if ((message.ideFile as any).projectModel) {
                        if (!message.ideFile.virtualChildFiles) {
                            message.ideFile.virtualChildFiles = [];
                        }

                        message.ideFile.virtualChildFiles.push(templatedIdeFile);

                        if (message.ideFile.fileKind === FileKind.cSharpProject) {
                            SolutionExplorerMessageTransporter
                                .transportMessage(webviewView, 
                                    new MessageReadVirtualFilesInCSharpProject(message.ideFile as CSharpProjectFile));
                        }
                        else if (message.ideFile.fileKind === FileKind.fSharpProject) {
                            SolutionExplorerMessageTransporter
                                .transportMessage(webviewView, 
                                    new MessageReadVirtualFilesInFSharpProject(message.ideFile as FSharpProjectFile));
                        }
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

        if (message.ideFile.fileKind === FileKind.directory) {
            writePath = message
                .ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput;
        }
        else if ((message.ideFile as any).projectModel) {
            writePath =
                message.ideFile.absoluteFilePath
                    .parentDirectories[
                    message.ideFile.absoluteFilePath
                        .parentDirectories.length - 1
                ].initialAbsoluteFilePathStringInput;
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


                    if (message.ideFile.fileKind === FileKind.directory) {
                        if (!message.ideFile.childFiles) {
                            message.ideFile.childFiles = [];
                        }

                        message.ideFile.childFiles.push(defaultFile);

                        SolutionExplorerMessageTransporter
                            .transportMessage(
                                webviewView,
                                new MessageReadFilesInDirectory(
                                    message.ideFile as DirectoryFile
                                ));
                    }
                    else if ((message.ideFile as any).projectModel) {
                        if (!message.ideFile.virtualChildFiles) {
                            message.ideFile.virtualChildFiles = [];
                        }

                        message.ideFile.virtualChildFiles.push(defaultFile);

                        if (message.ideFile.fileKind === FileKind.cSharpProject) {
                            SolutionExplorerMessageTransporter
                                .transportMessage(webviewView, 
                                    new MessageReadVirtualFilesInCSharpProject(message.ideFile as CSharpProjectFile));
                        }
                        else if (message.ideFile.fileKind === FileKind.fSharpProject) {
                            SolutionExplorerMessageTransporter
                                .transportMessage(webviewView, 
                                    new MessageReadVirtualFilesInFSharpProject(message.ideFile as FSharpProjectFile));
                        }
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

        if (message.ideFile.fileKind === FileKind.directory) {
            writePath = message
                .ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput;
        }
        else if ((message.ideFile as any).projectModel) {
            writePath =
                message.ideFile.absoluteFilePath
                    .parentDirectories[
                    message.ideFile.absoluteFilePath
                        .parentDirectories.length - 1
                ].initialAbsoluteFilePathStringInput;
        }

        if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
            writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }

        writePath += message.filenameWithExtension;

        let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        let templatedIdeFile = IdeFileFactory.constructIdeFile(absoluteFilePath, message.ideFile.namespace);

        fs.mkdir(templatedIdeFile.absoluteFilePath.initialAbsoluteFilePathStringInput, { recursive: true }, (err: any) => {
            if (!err) {



                if (message.ideFile.fileKind === FileKind.directory) {
                    if (!message.ideFile.childFiles) {
                        message.ideFile.childFiles = [];
                    }

                    message.ideFile.childFiles.push(templatedIdeFile);

                    SolutionExplorerMessageTransporter
                        .transportMessage(
                            webviewView,
                            new MessageReadFilesInDirectory(
                                message.ideFile as DirectoryFile
                            ));
                }
                else if ((message.ideFile as any).projectModel) {
                    if (!message.ideFile.virtualChildFiles) {
                        message.ideFile.virtualChildFiles = [];
                    }

                    message.ideFile.virtualChildFiles.push(templatedIdeFile);

                    if (message.ideFile.fileKind === FileKind.cSharpProject) {
                        SolutionExplorerMessageTransporter
                            .transportMessage(webviewView, 
                                new MessageReadVirtualFilesInCSharpProject(message.ideFile as CSharpProjectFile));
                    }
                    else if (message.ideFile.fileKind === FileKind.fSharpProject) {
                        SolutionExplorerMessageTransporter
                            .transportMessage(webviewView, 
                                new MessageReadVirtualFilesInFSharpProject(message.ideFile as FSharpProjectFile));
                    }
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

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetNewCSharpProject(message.cSharpProjectNameNoExtension, message.templateName) +
            ` ${ConstantsTerminal.TERMINAL_RUN_IF_PREVIOUS_COMMAND_SUCCESSFUL_OPERATOR} ` +
            ConstantsDotNetCli.formatDotNetAddCSharpProjectToSolutionUsingProjectName(message.cSharpProjectNameNoExtension, dotNetSolutionFileAbsoluteFilePath!));

        generalUseTerminal.show();
    }
    
    public static async handleMessageCreateFSharpProjectInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateFSharpProjectInAny;

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

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetNewFSharpProject(message.fSharpProjectNameNoExtension, message.templateName) +
            ` ${ConstantsTerminal.TERMINAL_RUN_IF_PREVIOUS_COMMAND_SUCCESSFUL_OPERATOR} ` +
            ConstantsDotNetCli.formatDotNetAddFSharpProjectToSolutionUsingProjectName(message.fSharpProjectNameNoExtension, dotNetSolutionFileAbsoluteFilePath!));

        generalUseTerminal.show();
    }
}