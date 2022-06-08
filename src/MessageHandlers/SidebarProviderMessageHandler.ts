import * as vscode from 'vscode';
import { IMessage } from "../Messages/IMessage";
import { MessageCategory } from "../Messages/MessageCategory";
import { CreateMessageHandler } from "./CreateMessageHandler";
import { DeleteMessageHandler } from "./DeleteMessageHandler";
import { ReadMessageHandler } from "./ReadMessageHandler";
import { UpdateMessageHandler } from "./UpdateMessageHandler";

export class SidebarProviderMessageHandler {
    public static async handleMessage(webviewView: vscode.WebviewView, untypedMessage: any): Promise<void> {

        let message = untypedMessage as IMessage;

        switch (message.messageCategory) {
            case MessageCategory.create:
              return CreateMessageHandler.handleMessage(webviewView, message);
            case MessageCategory.read: 
              return await ReadMessageHandler.handleMessage(webviewView, message);
            case MessageCategory.update:
              return UpdateMessageHandler.handleMessage(webviewView, message);
            case MessageCategory.delete:              
              return DeleteMessageHandler.handleMessage(webviewView, message);
          }
    }
}