import * as vscode from 'vscode';
import { ActiveDotNetSolutionFileContainer } from '../../ActiveDotNetSolutionFileContainer';
import { ConstantsDotNetCli } from '../../Constants/ConstantsDotNetCli';
import { ConstantsFileExtensionsNoPeriod } from '../../Constants/ConstantsFileExtensionsNoPeriod';
import { ConstantsFilePath } from '../../Constants/ConstantsFilePath';
import { ConstantsProjectFile } from '../../Constants/ConstantsProjectFile';
import { CSharpProjectModel } from '../../DotNet/CSharpProjectModel';
import { FSharpProjectModel } from '../../DotNet/FSharpProjectModel';
import { ProjectKind } from '../../DotNet/ProjectKind';
import { SolutionFolderModel } from '../../DotNet/SolutionFolderModel';
import { SolutionModel } from '../../DotNet/SolutionModel';
import { VCXProjectModel } from '../../DotNet/VCXProjectModel';
import { AbsoluteFilePath } from '../../FileSystem/AbsoluteFilePath';
import { FileKind } from '../../FileSystem/FileKind';
import { VCXProjectFile } from '../../FileSystem/Files/CPlusPlus/VCXProjectFile';
import { VCXProjectFilterListFile } from '../../FileSystem/Files/CPlusPlus/VCXProjectFilterListFile';
import { CSharpProjectFile } from '../../FileSystem/Files/CSharp/CSharpProjectFile';
import { DotNetSolutionFile } from '../../FileSystem/Files/DotNetSolutionFile';
import { FSharpProjectFile } from '../../FileSystem/Files/FSharp/FSharpProjectFile';
import { SolutionFolderFile } from '../../FileSystem/Files/SolutionFolderFile';
import { FileSorter } from '../../FileSystem/FileSorter';
import { FileSystemReader } from '../../FileSystem/FileSystemReader';
import { IdeFileFactory } from '../../FileSystem/IdeFileFactory';
import { IMessage } from '../../Messages/IMessage';
import { IMessageRead } from '../../Messages/Read/IMessageRead';
import { MessageReadActiveDotNetSolutionFile } from '../../Messages/Read/MessageReadActiveDotNetSolutionFile';
import { MessageReadFileIntoEditor } from '../../Messages/Read/MessageReadFileIntoEditor';
import { MessageReadFilesInDirectory } from '../../Messages/Read/MessageReadFilesInDirectory';
import { MessageReadFiltersInVCXProject } from '../../Messages/Read/MessageReadFiltersInVCXProject';
import { MessageReadKind } from '../../Messages/Read/MessageReadKind';
import { MessageReadNewProjectTemplatesOnComputer } from '../../Messages/Read/MessageReadNewProjectTemplatesOnComputer';
import { MessageReadNugetPackageReferencesInProject } from '../../Messages/Read/MessageReadNugetPackageReferencesInProject';
import { MessageReadProjectReferencesInProject } from '../../Messages/Read/MessageReadProjectReferencesInProject';
import { MessageReadSolutionIntoTreeView } from '../../Messages/Read/MessageReadSolutionIntoTreeView';
import { MessageReadSolutionsInWorkspace } from '../../Messages/Read/MessageReadSolutionsInWorkspace';
import { MessageReadVCXFilterMatches } from '../../Messages/Read/MessageReadVCXFilterMatches';
import { MessageReadVirtualFilesInProject as MessageReadVirtualFilesInProject } from '../../Messages/Read/MessageReadVirtualFilesInProject';
import { XmlParser, XmlTagModel, XmlTextModel } from '../../Parsers/XmlParseStateMachines';
import { XmlProjectParser } from '../../Parsers/XmlProjectParser';
import { TerminalService } from '../../Terminal/TerminalService';

const fs = require('fs');

export class SolutionExplorerReadMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.fileIntoEditor:
                await this.handleMessageReadFileIntoEditor(webviewView, message);
                break;
            case MessageReadKind.filesInDirectory:
                await this.handleMessageReadFilesInDirectory(webviewView, message);
                break;
            case MessageReadKind.virtualFilesInProject:
                await this.handleMessageReadVirtualFilesInProjectAsync(webviewView, message);
                break;
            case MessageReadKind.filtersInVCXProject:
                await this.handleMessageReadFiltersInVCXProject(webviewView, message);
                break;
            case MessageReadKind.vcxFilterMatches:
                await this.handleMessageReadVCXFilterMatches(webviewView, message);
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

                    await XmlProjectParser.parseRootNamespace(projectModel,
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
                        case ProjectKind.fSharpProject:
                            return new FSharpProjectFile(x as FSharpProjectModel);
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

        return await XmlProjectParser.parseProjectToProjectReferences(message.projectToProjectReferencesFile.parentProjectInitialAbsoluteFilePath,
            message.projectToProjectReferencesFile, () => {

                webviewView.webview.postMessage(message);
            });
    }

    public static async handleMessageReadNugetPackageReferencesInProject(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadNugetPackageReferencesInProject;

        return await XmlProjectParser.parseProjectNugetPackageReferences(message.projectNugetPackageDependenciesFile.parentProjectInitialAbsoluteFilePath,
            message.projectNugetPackageDependenciesFile, () => {

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
                        case ProjectKind.fSharpProject:
                            return new FSharpProjectFile(x as FSharpProjectModel);
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

    public static async handleMessageReadVirtualFilesInProjectAsync(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadVirtualFilesInProject;

        await FileSystemReader.getSiblingFiles(message.projectFile.absoluteFilePath, (siblingFiles: string[]) => {
            let previousVirtualChildFiles = message.projectFile.virtualChildFiles;

            siblingFiles = siblingFiles
                .filter(x => x !== message.projectFile.absoluteFilePath.filenameWithExtension);

            let siblingAbsoluteFilePaths: AbsoluteFilePath[] = siblingFiles
                .map(x => message.projectFile.absoluteFilePath.initialAbsoluteFilePathStringInput
                    .replace(message.projectFile.absoluteFilePath.filenameWithExtension, x))
                .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null));

            message.projectFile.virtualChildFiles = siblingAbsoluteFilePaths
                .map(absoluteFilePath => IdeFileFactory
                    .constructIdeFile(absoluteFilePath, message.projectFile.namespace));

            message.projectFile.virtualChildFiles = FileSorter.organizeContainer(message.projectFile.virtualChildFiles);

            for (let i = 0; i < message.projectFile.virtualChildFiles.length; i++) {
                let file = message.projectFile.virtualChildFiles[i];

                file.refreshParentNonce = message.projectFile.nonce;

                file.setVirtualChildFiles(message.projectFile.virtualChildFiles);

                if (previousVirtualChildFiles) {
                    let previousFileState = previousVirtualChildFiles.find(x => x.absoluteFilePath.initialAbsoluteFilePathStringInput ===
                        file.absoluteFilePath.initialAbsoluteFilePathStringInput);

                    if (previousFileState) {
                        file.isExpanded = previousFileState.isExpanded;
                    }
                }
            }

            webviewView.webview.postMessage(message);
        });
    }
    
    public static async handleMessageReadFiltersInVCXProject(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadFiltersInVCXProject;

        await FileSystemReader.getSiblingFiles(message.vcxProjectFile.absoluteFilePath, async (siblingFiles: string[]) => {
            let previousVirtualChildFiles = message.vcxProjectFile.virtualChildFiles;

            let vcxProjectFilters = siblingFiles.find(sibling => 
                sibling === message.vcxProjectFile.absoluteFilePath.filenameWithExtension 
                            + '.'
                            + ConstantsFileExtensionsNoPeriod.VCX_PROJECT_FILTERS_FILE_EXTENSION);

            if (!vcxProjectFilters) {
                return;
            }

            let vcxProjectFiltersAbsoluteFilePathString = message.vcxProjectFile.absoluteFilePath.initialAbsoluteFilePathStringInput
                .replace(message.vcxProjectFile.absoluteFilePath.filenameWithExtension, vcxProjectFilters);

            let vcxProjectFiltersAbsoluteFilePath = new AbsoluteFilePath(vcxProjectFiltersAbsoluteFilePathString, false, null);

            await fs.readFile(vcxProjectFiltersAbsoluteFilePath.initialAbsoluteFilePathStringInput, 'utf8', async (err: any, data: any) => {
                if (err) {
                    return;
                }

                let xmlParser: XmlParser = new XmlParser(data);
                let xmlFileModel = xmlParser.parse();

                let filters: XmlTagModel[] = [];

                xmlFileModel.selectRecursively((tag) => {
                    return tag.tagName === 'Filter';
                }, filters);

                if (!message.vcxProjectFile.virtualChildFiles) {
                    message.vcxProjectFile.virtualChildFiles = [];
                }

                filters = filters.filter(x => {
                    let tagResults: XmlTagModel[] = [];
                    
                    x.children.selectRecursively((tag) =>
                        tag.tagName === "UniqueIdentifier", tagResults);

                    if ((tagResults?.length ?? 0) > 0) {
                        return true;
                    }

                    return false;
                });
                
                filters = filters.filter(x => {
                    let tagResults: XmlTagModel[] = [];
                    
                    x.children.selectRecursively((tag) =>
                        tag.tagName === "Extensions", tagResults);

                    if ((tagResults?.length ?? 0) > 0) {
                        return true;
                    }

                    return false;
                });

                message.vcxProjectFile.virtualChildFiles = filters
                    .map(filter => {
                        let includeAttribute = filter.xmlAttributeModels
                            .find(attribute => attribute.attributeName === ConstantsProjectFile.INCLUDE_TAG_NAME);

                        let uniqueIdentifierResult: XmlTagModel[] = [];

                        filter.children.selectRecursively((tag) => {
                            return tag.tagName === "UniqueIdentifier";
                        }, uniqueIdentifierResult);
                
                        let uniqueIdentifier = (uniqueIdentifierResult[0].children.xmlTagModels[0] as XmlTextModel)
                            .text;
                        
                        let extensionsResult: XmlTagModel[] = [];
                
                        filter.children.selectRecursively((tag) => {
                            return tag.tagName === "Extensions";
                        }, extensionsResult);
                
                        let extensions = (extensionsResult[0].children.xmlTagModels[0] as XmlTextModel)
                            .text;

                        let absoluteFilePathString = message.vcxProjectFile.absoluteFilePath.initialAbsoluteFilePathStringInput
                            .replace(message.vcxProjectFile.absoluteFilePath.filenameWithExtension, (includeAttribute?.attributeValue ?? "undefined filter name"));

                        let absoluteFilePath = new AbsoluteFilePath(absoluteFilePathString, 
                            false, 
                            null);

                        let vcxProjectFilterListFile = new VCXProjectFilterListFile(absoluteFilePath,
                            uniqueIdentifier,
                            extensions);

                        vcxProjectFilterListFile.refreshParentNonce = message.vcxProjectFile.nonce;

                        return vcxProjectFilterListFile;
                    });

                webviewView.webview.postMessage(message);
            });
        });
    }

    public static async handleMessageReadVCXFilterMatches(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadVCXFilterMatches;

        let vcxProjectFilterListFile = message.vcxProjectFilterListFile;

        let validExtensions = vcxProjectFilterListFile.extensions.split(';');

        let matchedFiles: string[] = [];

        for (let i = 0; i < validExtensions.length; i++) {
            let extensionToMatch = validExtensions[i];

            let currentMatches = (await vscode.workspace.findFiles(`**/*.${extensionToMatch}`))
                .map(x => x.fsPath);
            
            if ((currentMatches?.length ?? 0) > 0) {

                matchedFiles = matchedFiles.concat(currentMatches);
            }
        }

        if (!message.vcxProjectFilterListFile.virtualChildFiles) {
            message.vcxProjectFilterListFile.virtualChildFiles = [];
        }

        let previousChildFiles = message.vcxProjectFilterListFile.virtualChildFiles;

            let childAbsoluteFilePaths: AbsoluteFilePath[] = matchedFiles
                .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null));

                message.vcxProjectFilterListFile.virtualChildFiles = childAbsoluteFilePaths
                .map(absoluteFilePath => IdeFileFactory
                    .constructIdeFile(absoluteFilePath, message.vcxProjectFilterListFile.namespace));

            message.vcxProjectFilterListFile.virtualChildFiles = FileSorter
                .organizeContainer(message.vcxProjectFilterListFile.virtualChildFiles);

            for (let i = 0; i < message.vcxProjectFilterListFile.virtualChildFiles.length; i++) {
                let file = message.vcxProjectFilterListFile.virtualChildFiles[i];

                file.refreshParentNonce = message.vcxProjectFilterListFile.nonce;
                
                file.setVirtualChildFiles(message.vcxProjectFilterListFile.virtualChildFiles);

                if (previousChildFiles) {
                    let previousFileState = previousChildFiles.find(x => x.absoluteFilePath.initialAbsoluteFilePathStringInput ===
                        file.absoluteFilePath.initialAbsoluteFilePathStringInput);

                    if (previousFileState) {
                        file.isExpanded = previousFileState.isExpanded;
                    }
                }
            }

            webviewView.webview.postMessage(message);
    }

    public static async handleMessageReadFilesInDirectory(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadFilesInDirectory;

        await FileSystemReader.getChildFilesOfDirectory(message.directoryFile.absoluteFilePath, (childFiles: string[]) => {
            let previousChildFiles = message.directoryFile.childFiles;

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

                file.refreshParentNonce = message.directoryFile.nonce;
                
                file.setVirtualChildFiles(message.directoryFile.childFiles);

                if (previousChildFiles) {
                    let previousFileState = previousChildFiles.find(x => x.absoluteFilePath.initialAbsoluteFilePathStringInput ===
                        file.absoluteFilePath.initialAbsoluteFilePathStringInput);

                    if (previousFileState) {
                        file.isExpanded = previousFileState.isExpanded;
                    }
                }
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
                        "preserveFocus": message.preview,
                        "preview": message.preview,
                        "viewColumn": vscode.ViewColumn.One
                    };

                    vscode.window.showTextDocument(doc, textDocumentShowOptions);
                });
                break;
        }
    }

    public static async handleMessageReadNewProjectTemplatesOnComputer(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageReadNewProjectTemplatesOnComputer;

        let generalUseTerminal = TerminalService.getGeneralUseTerminal();

        generalUseTerminal.sendText(ConstantsDotNetCli.DOT_NET_NEW_LIST);
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