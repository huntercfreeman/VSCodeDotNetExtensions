import * as vscode from 'vscode';
import { IMessage } from "../../Messages/IMessage";
import { MessageCategory } from "../../Messages/MessageCategory";
import { NugetPackageManagerCreateMessageHandler } from './NugetPackageManagerCreateMessageHandler';
import { NugetPackageManagerDeleteMessageHandler } from './NugetPackageManagerDeleteMessageHandler';
import { NugetPackageManagerExecuteMessageHandler } from './NugetPackageManagerExecuteMessageHandler';
import { NugetPackageManagerReadMessageHandler } from './NugetPackageManagerReadMessageHandler';
import { NugetPackageManagerUpdateMessageHandler } from './NugetPackageManagerUpdateMessageHandler';

export class NugetPackageManagerMessageTransporter {
  public static async transportMessage(webviewView: vscode.WebviewView, untypedMessage: any): Promise<void> {

    let message = untypedMessage as IMessage;

    switch (message.messageCategory) {
      case MessageCategory.create:
        return NugetPackageManagerCreateMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.read:
        return await NugetPackageManagerReadMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.update:
        return NugetPackageManagerUpdateMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.execute:
        return NugetPackageManagerExecuteMessageHandler.handleMessage(webviewView, message);
      case MessageCategory.delete:
        return NugetPackageManagerDeleteMessageHandler.handleMessage(webviewView, message);
    }
  }
}