import * as vscode from 'vscode';
import { ConstantsMessages } from '../Constants/ConstantsMessages';
import { SolutionModel } from '../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';

/**
 * SidebarProvider is the main entry point for the IDE user interface to be displayed.
 */
export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly context: vscode.ExtensionContext) 
    {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this.context.extensionUri],
    };

    webviewView.webview.html = this.getWebviewContent(webviewView.webview);
    
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE: {
          return await loadSolutionsInWorkspace(webviewView, data);
        }
        case ConstantsMessages.PARSE_SOLUTION: {
          return await SolutionModel.parseSolution(data.value, () => {
            webviewView.webview.postMessage(data);
          });
        }
        case ConstantsMessages.LOAD_CSHARP_PROJECT_CHILD_FILES: {
          return await SolutionModel.parseSolution(data.value, (childFiles: any[]) => {
            data.value = {
              secondGuid: data.value.secondGuid,
              childFiles: childFiles
            };

            webviewView.webview.postMessage(data);
          });
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private getWebviewContent(webview: vscode.Webview) {
  	const dotNetIdeSvelteAppJavaScriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
	  	this.context.extensionUri, 'out/SvelteApp/build', 'bundle.js'));

    const dotNetIdeSvelteAppCssUri = webview.asWebviewUri(vscode.Uri.joinPath(
		  this.context.extensionUri, 'out/SvelteApp/build', 'bundle.css'));

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
    <link href="${dotNetIdeSvelteAppCssUri}" rel="stylesheet">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body style="padding: 0 5px;">
	  <script src="${dotNetIdeSvelteAppJavaScriptUri}"></script>
  </body>
  </html>`;
  }
}

async function loadSolutionsInWorkspace(webviewView: vscode.WebviewView, data: any): Promise<void> {
  let workspaceFolderAbsolutePath: string;

	let workspaceFolderFsPaths = vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath);

	if (workspaceFolderFsPaths === null ||
		workspaceFolderFsPaths === undefined ||
		workspaceFolderFsPaths.length === 0) {
      return;
	}
	else {
		workspaceFolderAbsolutePath = workspaceFolderFsPaths[0];
	}

  if (!workspaceFolderAbsolutePath) {
    vscode.window.showInformationMessage('No files in empty workspace');
  }

  let solutionFsPaths = (await vscode.workspace.findFiles("**/*.sln"))
    .map(x => x.fsPath);

  if (solutionFsPaths.length === 0) {
      vscode.window.showErrorMessage("No .sln files were found within workspace");
      return;
  }

  solutionFsPaths.sort((solutionOne, solutionTwo) => {
    return solutionOne.localeCompare(solutionTwo);
  });
  
  let solutionAbsoluteFilePaths = solutionFsPaths.map(x => 
    new AbsoluteFilePath(x, false, null, null));

  let solutions = solutionAbsoluteFilePaths.map(x =>
    new SolutionModel(x));

  data.value = solutions;

  webviewView.webview.postMessage(data);
}