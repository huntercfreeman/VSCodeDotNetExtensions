import * as vscode from 'vscode';
import { SolutionExplorerMessageHandler } from '../MessageHandlers/SolutionExplorerMessageHandler';
import { ActiveDotNetSolutionFileContainer } from '../ActiveDotNetSolutionFileContainer';
import { MessageReadVirtualFilesInSolution } from '../Messages/Read/MessageReadVirtualFilesInSolution';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { MessageReadUndefinedSolution } from '../Messages/Read/MessageReadUndefinedSolution';

const fs = require('fs');

export class XmlEditorWebviewProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  private activeDotNetSolutionFile: DotNetSolutionFile | undefined;

  constructor(private readonly context: vscode.ExtensionContext) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {

    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private getWebviewContent(webview: vscode.Webview) {
    const xmlEditorJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/xmlEditor', 'xmlEditor.js'));

    const xmlEditorCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/xmlEditor', 'xmlEditor.css'));

    const resetCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "reset.css")
    );

    const vSCodeCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "vscode.css")
    );

    const dotNetIdeCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, "media", "dotNetIde.css")
    );

    return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>NugetPackageManagerWebview</title>
    <link href="${resetCssUri}" rel="stylesheet">
    <link href="${vSCodeCssUri}" rel="stylesheet">
    <link href="${dotNetIdeCssUri}" rel="stylesheet">
    <link href="${xmlEditorCssUri}" rel="stylesheet">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body style="padding: 0 5px;" class="">
	  <script src="${xmlEditorJavaScriptUri}"></script>
  </body>
  </html>`;
  }
}
