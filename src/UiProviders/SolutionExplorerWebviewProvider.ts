import * as vscode from 'vscode';
import { ActiveDotNetSolutionFileContainer } from '../ActiveDotNetSolutionFileContainer';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { SolutionExplorerMessageTransporter } from '../MessageHandlers/SolutionExplorer/SolutionExplorerMessageTransporter';
import { MessageReadUndefinedSolution } from '../Messages/Read/MessageReadUndefinedSolution';
import { MessageReadVirtualFilesInSolution } from '../Messages/Read/MessageReadVirtualFilesInSolution';

const fs = require('fs');

export class SolutionExplorerWebviewProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  private activeDotNetSolutionFile: DotNetSolutionFile | undefined;

  constructor(private readonly context: vscode.ExtensionContext) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {

    ActiveDotNetSolutionFileContainer.solutionExplorerWebviewProviderSubscription = (activeDotNetSolution) =>
    {
      this.activeDotNetSolutionFile = activeDotNetSolution;

      if (this.activeDotNetSolutionFile) {
        SolutionExplorerMessageTransporter
          .transportMessage(webviewView, new MessageReadVirtualFilesInSolution(this.activeDotNetSolutionFile));
      }
      else {
        webviewView.webview.postMessage(new MessageReadUndefinedSolution());
      }
    };

    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) =>
    SolutionExplorerMessageTransporter.transportMessage(webviewView, data.value));
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private getWebviewContent(webview: vscode.Webview) {
    const solutionExplorerWebviewJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/solutionExplorerWebview', 'solutionExplorerWebview.js'));

    const solutionExplorerWebviewCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      this.context.extensionUri, 'out/solutionExplorerWebview', 'solutionExplorerWebview.css'));

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
    <link href="${solutionExplorerWebviewCssUri}" rel="stylesheet">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body style="padding: 0 5px;" class="">
	  <script src="${solutionExplorerWebviewJavaScriptUri}"></script>
  </body>
  </html>`;
  }
}
