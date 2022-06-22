import * as vscode from 'vscode';
import { ConstantsDotNetCli } from '../../Constants/ConstantsDotNetCli';
import { ConstantsFilePath } from '../../Constants/ConstantsFilePath';
import { ConstantsFileTemplates } from '../../Constants/ConstantsFileTemplates';
import { ConstantsTerminal } from '../../Constants/ConstantsTerminal';
import { AbsoluteFilePath } from '../../FileSystem/AbsoluteFilePath';
import { FileKind } from '../../FileSystem/FileKind';
import { DefaultFile } from '../../FileSystem/Files/DefaultFile';
import { DirectoryFile } from '../../FileSystem/Files/DirectoryFile';
import { DotNetSolutionFile } from '../../FileSystem/Files/DotNetSolutionFile';
import { IdeFileFactory } from '../../FileSystem/IdeFileFactory';
import { IMessage } from '../../Messages/IMessage';
import { IMessageCreate } from '../../Messages/Create/IMessageCreate';
import { MessageCreateProjectInAny } from '../../Messages/Create/MessageCreateProjectInAny';
import { MessageCreateDirectoryInAny } from '../../Messages/Create/MessageCreateDirectoryInAny';
import { MessageCreateDotNetSolutionInWorkspace } from '../../Messages/Create/MessageCreateDotNetSolutionInWorkspace';
import { MessageCreateEmptyFileInAny } from '../../Messages/Create/MessageCreateEmptyFileInAny';
import { MessageCreateKind } from '../../Messages/Create/MessageCreateKind';
import { MessageCreateTemplatedFileInAny } from '../../Messages/Create/MessageCreateTemplatedFileInAny';
import { TerminalService } from '../../Terminal/TerminalService';
import { SolutionExplorerMessageTransporter } from './SolutionExplorerMessageTransporter';
import { MessageReadFilesInDirectory } from '../../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadVirtualFilesInProject } from '../../Messages/Read/MessageReadVirtualFilesInProject';

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
            case MessageCreateKind.projectInAny:
                await this.handleMessageCreateProjectInAny(webviewView, message);
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

                        SolutionExplorerMessageTransporter
                                .transportMessage(webviewView, 
                                    new MessageReadVirtualFilesInProject(message.ideFile as any));
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

                        SolutionExplorerMessageTransporter
                                .transportMessage(webviewView, 
                                    new MessageReadVirtualFilesInProject(message.ideFile as any));
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

                    SolutionExplorerMessageTransporter
                            .transportMessage(webviewView, 
                                new MessageReadVirtualFilesInProject(message.ideFile as any));
                }
            }
        });
    }

    public static async handleMessageCreateProjectInAny(webviewView: vscode.WebviewView, iMessage: IMessage) {
        
        let message = iMessage as MessageCreateProjectInAny;

        let dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath | undefined;

        let dotNetSolutionFile = message.ideFile as DotNetSolutionFile;

        dotNetSolutionFileAbsoluteFilePath = dotNetSolutionFile.absoluteFilePath;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetNewProject(message.projectNameWithExtension, message.templateName, message.lang) +
            ` ${ConstantsTerminal.TERMINAL_RUN_IF_PREVIOUS_COMMAND_SUCCESSFUL_OPERATOR} ` +
            ConstantsDotNetCli.formatDotNetAddProjectToSolutionUsingProjectName(message.projectNameNoExtension, message.projectNameWithExtension, dotNetSolutionFileAbsoluteFilePath!));

        generalUseTerminal.show();
    }
}