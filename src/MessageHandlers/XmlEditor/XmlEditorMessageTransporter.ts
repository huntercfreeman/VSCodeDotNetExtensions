import * as vscode from 'vscode';
import { IMessage } from "../../Messages/IMessage";
import { MessageCategory } from "../../Messages/MessageCategory";
import { XmlEditorCreateMessageHandler } from './XmlEditorCreateMessageHandler';
import { XmlEditorDeleteMessageHandler } from './XmlEditorDeleteMessageHandler';
import { XmlEditorExecuteMessageHandler } from './XmlEditorExecuteMessageHandler';
import { XmlEditorReadMessageHandler } from './XmlEditorReadMessageHandler';
import { XmlEditorUpdateMessageHandler } from './XmlEditorUpdateMessageHandler';

export class XmlEditorMessageTransporter {
  public static async transportMessage(webviewView: vscode.WebviewPanel, untypedMessage: any): Promise<void> {

    let message = untypedMessage as IMessage;

    switch (message.messageCategory) {
      case MessageCategory.create:
        return XmlEditorCreateMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.read:
        return await XmlEditorReadMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.update:
        return XmlEditorUpdateMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.execute:
        return XmlEditorExecuteMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.delete:
        return XmlEditorDeleteMessageHandler.handleMessage(webviewView, message);
    }
  }
}