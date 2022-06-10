import * as vscode from 'vscode';
import { ConstantsFilePath } from '../Constants/ConstantsFilePath';
import { ConstantsFileTemplates } from '../Constants/ConstantsFileTemplates';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { IdeFileFactory } from '../FileSystem/IdeFileFactory';
import { IMessageCreate } from "../Messages/Create/IMessageCreate";
import { MessageCreateDirectoryInDirectory } from '../Messages/Create/MessageCreateDirectoryInDirectory';
import { MessageCreateKind } from "../Messages/Create/MessageCreateKind";
import { MessageCreateTemplatedFileInDirectory } from '../Messages/Create/MessageCreateTemplatedFileInDirectory';
import { IMessage } from "../Messages/IMessage";

const fs = require('fs');

export class CreateMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, message: IMessage): Promise<void> {
        let createMessage = message as unknown as IMessageCreate;

        switch (createMessage.messageCreateKind) {
            case MessageCreateKind.emptyFileInDirectory:
                break;
            case MessageCreateKind.cSharpProjectInSolution:
                await this.handleMessageCreateCSharpProjectInSolution(webviewView, message);
                break;
            case MessageCreateKind.projectInSolutionFolder:
                break;
            case MessageCreateKind.solutionFolderInSolution:
                break;
            case MessageCreateKind.directoryInDirectory:
                await this.handleMessageCreateDirectoryInDirectory(webviewView, message);
                break;
            case MessageCreateKind.templatedFileInDirectory:
                await this.handleMessageCreateTemplatedFileInDirectory(webviewView, message);
                break;
        }
    }

    public static async handleMessageCreateTemplatedFileInDirectory(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateTemplatedFileInDirectory;

        let writePath: string = message.directoryFile.absoluteFilePath.initialAbsoluteFilePathStringInput;

        if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
            writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }

        writePath += message.filenameWithExtension;

        let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        let ideFile = IdeFileFactory.constructIdeFile(absoluteFilePath, message.directoryFile.namespace);

        fs.writeFile(writePath,
            ConstantsFileTemplates.getFileTemplate(ideFile),
            { flag: 'a+' },
            (err: any) => {
                if (!err) {
                    if (!message.directoryFile.childFiles) {
                        message.directoryFile.childFiles = [];
                    }

                    message.directoryFile.childFiles.push(ideFile);
                    
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
    
    public static async handleMessageCreateDirectoryInDirectory(webviewView: vscode.WebviewView, iMessage: IMessage) {
        let message = iMessage as MessageCreateDirectoryInDirectory;

        let writePath: string = message.directoryFile.absoluteFilePath.initialAbsoluteFilePathStringInput;

        if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
            writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        }

        writePath += message.filenameWithExtension;

        let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        let ideFile = IdeFileFactory.constructIdeFile(absoluteFilePath, message.directoryFile.namespace);

        fs.mkdir(ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput, { recursive: true }, (err: any) => {
        });
    }
    
    
    public static async handleMessageCreateCSharpProjectInSolution(webviewView: vscode.WebviewView, iMessage: IMessage) {
        // let message = iMessage as MessageCreateDirectoryInDirectory;

        // let writePath: string = message.directoryFile.absoluteFilePath.initialAbsoluteFilePathStringInput;

        // if (!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
        //     writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
        // }

        // writePath += message.filenameWithExtension;

        // let absoluteFilePath = new AbsoluteFilePath(writePath, false, null);

        // let ideFile = IdeFileFactory.constructIdeFile(absoluteFilePath, message.directoryFile.namespace);

        // fs.mkdir(ideFile.absoluteFilePath.initialAbsoluteFilePathStringInput, { recursive: true }, (err: any) => {
        // });
    }
}