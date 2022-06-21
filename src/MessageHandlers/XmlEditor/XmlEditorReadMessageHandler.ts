import * as vscode from 'vscode';
import { ActiveDotNetSolutionFileContainer } from '../../ActiveDotNetSolutionFileContainer';
import { IMessage } from '../../Messages/IMessage';
import { IMessageRead } from '../../Messages/Read/IMessageRead';
import { MessageReadActiveDotNetSolutionFile } from '../../Messages/Read/MessageReadActiveDotNetSolutionFile';
import { MessageReadKind } from '../../Messages/Read/MessageReadKind';
import { MessageReadProjectXmlIntoXmlEditor } from '../../Messages/Read/MessageReadProjectXmlIntoXmlEditor';
import { XmlFileModel } from '../../Parsers/XmlParseStateMachines';
import { XmlProjectParser } from '../../Parsers/XmlProjectParser';

export class XmlEditorReadMessageHandler {
    public static async handleMessage(webviewPanel: vscode.WebviewPanel, message: IMessage): Promise<void> {
        let readMessage = message as unknown as IMessageRead;

        switch (readMessage.messageReadKind) {
            case MessageReadKind.activeDotNetSolutionFile:
                this.handleMessageReadActiveDotNetSolutionFile(webviewPanel, message);
                break;
            case MessageReadKind.projectXmlIntoXmlEditor:
                this.handleMessageReadProjectXmlIntoXmlEditor(webviewPanel, message);
                break;
        }
    }

    private static handleMessageReadActiveDotNetSolutionFile(webViewPanel: vscode.WebviewPanel, untypedMessage: IMessage) {
        let message = untypedMessage as MessageReadActiveDotNetSolutionFile;

        message.activeDotNetSolutionFile = ActiveDotNetSolutionFileContainer.getActiveDotNetSolutionFile();

        webViewPanel.webview.postMessage(message);        
    }
    
    private static handleMessageReadProjectXmlIntoXmlEditor(webViewPanel: vscode.WebviewPanel, untypedMessage: IMessage) {
        let message = untypedMessage as MessageReadProjectXmlIntoXmlEditor;

        let projectParser = new XmlProjectParser(undefined,
            undefined,
            undefined,
            message.projectModel);

        projectParser.parse((xmlFileModel: XmlFileModel) => {
            message.xmlFileModel = xmlFileModel;

            webViewPanel.webview.postMessage(message);        
        });
    }
}