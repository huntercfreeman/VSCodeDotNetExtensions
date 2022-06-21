import * as vscode from 'vscode';
import { IMessage } from "../../Messages/IMessage";
import { MessageCategory } from "../../Messages/MessageCategory";
import { SolutionExplorerCreateMessageHandler } from './SolutionExplorerCreateMessageHandler';
import { SolutionExplorerDeleteMessageHandler } from './SolutionExplorerDeleteMessageHandler';
import { SolutionExplorerExecuteMessageHandler } from './SolutionExplorerExecuteMessageHandler';
import { SolutionExplorerReadMessageHandler } from './SolutionExplorerReadMessageHandler';
import { SolutionExplorerUpdateMessageHandler } from './SolutionExplorerUpdateMessageHandler';

export class SolutionExplorerMessageTransporter {
  public static async transportMessage(webviewView: vscode.WebviewView, untypedMessage: any): Promise<void> {

    let message = untypedMessage as IMessage;

    switch (message.messageCategory) {
      case MessageCategory.create:
        return SolutionExplorerCreateMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.read:
        return await SolutionExplorerReadMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.update:
        return SolutionExplorerUpdateMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.execute:
        return SolutionExplorerExecuteMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.delete:
        return SolutionExplorerDeleteMessageHandler.handleMessage(webviewView, message);
    }
  }
}