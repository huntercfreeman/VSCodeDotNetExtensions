import * as vscode from 'vscode';
import { DotNetSolutionFile } from '../FileSystem/Files/DotNetSolutionFile';
import { getNonce } from '../IdGeneration/getNonce';

const fs = require('fs');

export class XmlEditorWebviewPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: XmlEditorWebviewPanel | undefined;

  public static readonly viewType = "dot-net-ide.xml-editor";

  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(context: vscode.ExtensionContext) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (XmlEditorWebviewPanel.currentPanel) {
      XmlEditorWebviewPanel.currentPanel.panel.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      XmlEditorWebviewPanel.viewType,
      "Xml Editor",
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,
      }
    );

    panel.webview.html = XmlEditorWebviewPanel.getWebviewContent(panel.webview, context);

    XmlEditorWebviewPanel.currentPanel = new XmlEditorWebviewPanel(panel, context);
  }

  public static kill() {
    XmlEditorWebviewPanel.currentPanel?.dispose();
    XmlEditorWebviewPanel.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, context: vscode.ExtensionContext) {
    XmlEditorWebviewPanel.currentPanel = new XmlEditorWebviewPanel(panel, context);
  }

  private constructor(private readonly panel: vscode.WebviewPanel, 
    private readonly context: vscode.ExtensionContext) {

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this.panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    XmlEditorWebviewPanel.currentPanel = undefined;

    // Clean up our resources
    this.panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private static getWebviewContent(webview: vscode.Webview,
    context: vscode.ExtensionContext) {

    const xmlEditorJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
      context.extensionUri, 'out/xmlEditor', 'xmlEditor.js'));

    const xmlEditorCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
      context.extensionUri, 'out/xmlEditor', 'xmlEditor.css'));

    const resetCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "media", "reset.css")
    );

    const vSCodeCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "media", "vscode.css")
    );

    const dotNetIdeCssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "media", "dotNetIde.css")
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