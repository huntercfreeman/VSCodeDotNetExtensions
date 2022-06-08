import { MessageCategory } from "./MessageCategory";

/**
 * To be used to more strongly define webviewView.webview.onDidReceiveMessage parameters
 * and webviewView.webview.postMessage(data) parameters;
 */
export abstract class MessageBase {
    constructor() {
    }

    public abstract readonly messageCategory: MessageCategory;
}