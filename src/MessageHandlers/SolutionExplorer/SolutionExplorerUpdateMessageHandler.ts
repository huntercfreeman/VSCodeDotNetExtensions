import * as vscode from 'vscode';
import { ConstantsClipboard } from '../../Constants/ConstantsClipboard';
import { ConstantsDotNetCli } from '../../Constants/ConstantsDotNetCli';
import { ConstantsFilePath } from '../../Constants/ConstantsFilePath';
import { AbsoluteFilePath } from '../../FileSystem/AbsoluteFilePath';
import { FileKind } from '../../FileSystem/FileKind';
import { CSharpProjectFile } from '../../FileSystem/Files/CSharp/CSharpProjectFile';
import { DirectoryFile } from '../../FileSystem/Files/DirectoryFile';
import { FSharpProjectFile } from '../../FileSystem/Files/FSharp/FSharpProjectFile';
import { FileSystemReader } from '../../FileSystem/FileSystemReader';
import { IMessage } from '../../Messages/IMessage';
import { MessageReadFilesInDirectory } from '../../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadVirtualFilesInCSharpProject } from '../../Messages/Read/MessageReadVirtualFilesInCSharpProject';
import { MessageReadVirtualFilesInFSharpProject } from '../../Messages/Read/MessageReadVirtualFilesInFSharpProject';
import { IMessageUpdate } from '../../Messages/Update/IMessageUpdate';
import { MessageUpdateAddNugetPackageReference } from '../../Messages/Update/MessageUpdateAddNugetPackageReference';
import { MessageUpdateAddProjectReference } from '../../Messages/Update/MessageUpdateAddProjectReference';
import { MessageUpdateCopyAny } from '../../Messages/Update/MessageUpdateCopyAny';
import { MessageUpdateCutAny } from '../../Messages/Update/MessageUpdateCutAny';
import { MessageUpdateExistingProjectIntoSolution } from '../../Messages/Update/MessageUpdateExistingProjectIntoSolution';
import { MessageUpdateKind } from '../../Messages/Update/MessageUpdateKind';
import { MessageUpdatePasteIntoAny } from '../../Messages/Update/MessageUpdatePasteIntoAny';
import { MessageUpdatePutProjectInSolutionFolder } from '../../Messages/Update/MessageUpdatePutProjectInSolutionFolder';
import { MessageUpdateRemoveNugetPackageReference } from '../../Messages/Update/MessageUpdateRemoveNugetPackageReference';
import { MessageUpdateRemoveProject } from '../../Messages/Update/MessageUpdateRemoveProject';
import { MessageUpdateRemoveProjectReference } from '../../Messages/Update/MessageUpdateRemoveProjectReference';
import { MessageUpdateRenameAny } from '../../Messages/Update/MessageUpdateRenameAny';
import { TerminalService } from '../../Terminal/TerminalService';
import { SolutionExplorerMessageTransporter } from './SolutionExplorerMessageTransporter';

export class SolutionExplorerUpdateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let updateMessage = message as unknown as IMessageUpdate;

        switch (updateMessage.messageUpdateKind) {
            case MessageUpdateKind.existingProjectIntoSolution:
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
            case MessageUpdateKind.removeNugetPackageReference:
                await this.handleMessageUpdateRemoveNugetPackageReference(webviewView, message);
                break;
            case MessageUpdateKind.copyAny:
                await this.handleMessageUpdateCopyAny(webviewView, message);
                break;
            case MessageUpdateKind.cutAny:
                await this.handleMessageUpdateCutAny(webviewView, message);
                break;
            case MessageUpdateKind.pasteIntoAny:
                await this.handleMessageUpdatePasteIntoAny(webviewView, message);
                break;
            case MessageUpdateKind.renameAny:
                await this.handleMessageUpdateRenameAny(webviewView, message);
                break;
        }
    }

    public static async handleMessageUpdateExistingCSharpProjectIntoSolution(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateExistingProjectIntoSolution;

        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Existing C# Project',
            canSelectFiles: true,
            canSelectFolders: false
        };

        vscode.window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
                console.log('Selected file: ' + fileUri[0].fsPath);

                let generalUseTerminal = TerminalService.getGeneralUseTerminal();

                generalUseTerminal.sendText(
                    ConstantsDotNetCli.formatDotNetAddCSharpProjectToSolutionUsingProjectFsPath(fileUri[0].fsPath,
                        message.dotNetSolutionFile));

                generalUseTerminal.show();
            }
        });
    }

    public static async handleMessageUpdateRemoveProject(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateRemoveProject;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetRemoveCSharpProjectFromSolutionUsingProjectUsingAbsoluteFilePath(message.projectFile.projectModel.absoluteFilePath,
                message.projectFile.projectModel.parentSolutionAbsoluteFilePath));

        generalUseTerminal.show();
    }
    
    public static async handleMessageUpdatePutProjectInSolutionFolder(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdatePutProjectInSolutionFolder;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        let removeProjectCommand = ConstantsDotNetCli.formatDotNetRemoveCSharpProjectFromSolutionUsingProjectUsingAbsoluteFilePath(message.projectModel.absoluteFilePath,
            message.projectModel.parentSolutionAbsoluteFilePath);

        let addBackProjectButInSolutionFolderCommand = ConstantsDotNetCli.formatDotNetPutProjectInSolutionFolder(message.projectModel.absoluteFilePath,
            message.projectModel.parentSolutionAbsoluteFilePath,
            message.solutionFolderName);

        generalUseTerminal.sendText(removeProjectCommand + " && " +
                                       addBackProjectButInSolutionFolderCommand);

        generalUseTerminal.show();
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
                let generalUseTerminal = TerminalService.getGeneralUseTerminal();

                generalUseTerminal.sendText(
                    ConstantsDotNetCli.formatDotNetAddCSharpProjectReferenceToCSharpProject(message.projectProjectReferencesFile.parentProjectInitialAbsoluteFilePath,
                        fileUri[0].fsPath));

                generalUseTerminal.show();
            }
        });
    }

    public static async handleMessageUpdateRemoveProjectReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateRemoveProjectReference;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetRemoveCSharpProjectReferenceFromCSharpProject(message.cSharpProjectProjectReferenceFile.parentProjectInitialAbsoluteFilePath,
                message.cSharpProjectProjectReferenceFile.projectReferenceAbsoluteFilePath));

        generalUseTerminal.show();
    }

    public static async handleMessageUpdateAddNugetPackageReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateAddNugetPackageReference;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetAddNugetPackageReferenceToCSharpProject(message.cSharpProjectFile.absoluteFilePath,
                message.nugetPackageModel,
                message.nugetPackageVersionModel));

        generalUseTerminal.show();
    }

    public static async handleMessageUpdateRemoveNugetPackageReference(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageUpdateRemoveNugetPackageReference;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(
            ConstantsDotNetCli.formatDotNetRemoveNugetPackageReferenceFromCSharpProject(message.projectNugetPackageDependencyFile.parentCSharpProjectInitialAbsoluteFilePath,
                message.projectNugetPackageDependencyFile.nugetPackageId));

        generalUseTerminal.show();
    }

    private static handleMessageUpdateRenameAny(webviewView: vscode.WebviewView, messageUntyped: IMessage) {
        let message = messageUntyped as MessageUpdateRenameAny;

        let renameWorkspaceEdit = new vscode.WorkspaceEdit();

        let toBeAbsoluteFilePathString = message.ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput
            .replace(message.ideFile.absoluteFilePath.filenameWithExtension,
                message.toBeFilenameWithExtension);

        renameWorkspaceEdit.renameFile(vscode.Uri.file(message.ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput),
            vscode.Uri.file(toBeAbsoluteFilePathString));

        vscode.workspace.applyEdit(renameWorkspaceEdit).then((value: boolean) => {
            // onfulfilled
            
        }, 
        (reason: any) => {
            // onrejected
            
        });
    }

    private static handleMessageUpdatePasteIntoAny(webviewView: vscode.WebviewView, messageUntyped: IMessage) {
        let message = messageUntyped as MessageUpdatePasteIntoAny;

        vscode.env.clipboard.readText().then((async clipboardText => {

            if (clipboardText &&
                    (clipboardText.startsWith(ConstantsClipboard.COPY_OPERATION) || 
                    clipboardText.startsWith(ConstantsClipboard.CUT_OPERATION))) {

                        let directoryAbsoluteFilePath: AbsoluteFilePath = message.ideFile.absoluteFilePath;

                        if ((message.ideFile as any).projectModel) {
                            directoryAbsoluteFilePath = message.ideFile.absoluteFilePath
                                        .parentDirectories[
                                            message.ideFile.absoluteFilePath
                                            .parentDirectories.length - 1
                                    ];
                        }

                        let copiedAbsoluteFilePathString = clipboardText
                            .replace(ConstantsClipboard.COPY_OPERATION + ConstantsClipboard.OPERATION_DELIMITER, "")
                            .replace(ConstantsClipboard.CUT_OPERATION + ConstantsClipboard.OPERATION_DELIMITER, "");

                        let isDir = FileSystemReader.isDir(copiedAbsoluteFilePathString);

                        let absoluteFilePath = new AbsoluteFilePath(copiedAbsoluteFilePathString, isDir, null);

                        let parentDirectoryWithFileDelimiter = directoryAbsoluteFilePath.initialAbsoluteFilePathStringInput.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)
                            ? directoryAbsoluteFilePath.initialAbsoluteFilePathStringInput
                            : directoryAbsoluteFilePath.initialAbsoluteFilePathStringInput + ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;

                        let target = parentDirectoryWithFileDelimiter + absoluteFilePath.filenameWithExtension;

                        vscode.workspace.fs.copy(vscode.Uri.file(copiedAbsoluteFilePathString),
                            vscode.Uri.file(target)).then((x) => {
                                
                                if (clipboardText.startsWith(ConstantsClipboard.CUT_OPERATION)) {
                                    vscode.workspace.fs.delete(vscode.Uri.file(copiedAbsoluteFilePathString),
                                    {
                                        "recursive": true,
                                        "useTrash": true
                                    });
                                }

                                if ((message.ideFile as any).projectModel) {

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
                                else {
                                    SolutionExplorerMessageTransporter
                                        .transportMessage(webviewView, 
                                            new MessageReadFilesInDirectory(message.ideFile as DirectoryFile));
                                }
                            });
            }
        }));
    }

    private static handleMessageUpdateCutAny(webviewView: vscode.WebviewView, messageUntyped: IMessage) {
        let message = messageUntyped as MessageUpdateCutAny;

        vscode.env.clipboard
            .writeText(ConstantsClipboard.CUT_OPERATION +
                       ConstantsClipboard.OPERATION_DELIMITER +
                       message.ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput 
            );
    }

    private static handleMessageUpdateCopyAny(webviewView: vscode.WebviewView, messageUntyped: IMessage) {
        let message = messageUntyped as MessageUpdateCopyAny;

        vscode.env.clipboard
            .writeText(ConstantsClipboard.COPY_OPERATION +
                       ConstantsClipboard.OPERATION_DELIMITER +
                       message.ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput 
            );
    }
}