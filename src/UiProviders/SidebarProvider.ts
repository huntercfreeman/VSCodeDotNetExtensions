import * as vscode from 'vscode';
import { ConstantsFilePath } from '../Constants/ConstantsFilePath';
import { ConstantsMessages } from '../Constants/ConstantsMessages';
import { SolutionModel } from '../DotNet/SolutionModel';
import { AbsoluteFilePath } from '../FileSystem/AbsoluteFilePath';
import { DefaultFile } from '../FileSystem/DefaultFile';
import { DirectoryFile } from '../FileSystem/DirectoryFile';
import { FileSystemReader } from '../FileSystem/FileSystemReader';
import { IdeFileFactory } from '../FileSystem/IdeFileFactory';

const fs = require('fs');

/**
 * SidebarProvider is the main entry point for the IDE user interface to be displayed.
 */
export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly context: vscode.ExtensionContext) { }

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
          return await FileSystemReader.getSiblingFiles(data.value.absoluteFilePath, (siblingFiles: any[]) => {
            this.handleLoadCSharpProjectChildFilesResponse(webviewView, data, siblingFiles);
          });
        }
        case ConstantsMessages.LOAD_DIRECTORY_CHILD_FILES: {
          return await FileSystemReader.getChildFilesOfDirectory(data.value.absoluteFilePath, (childFiles: any[]) => {
            this.handleGetChildFilesOfDirectoryResponse(webviewView, data, childFiles);
          });
        }
        case ConstantsMessages.ADD_EMPTY_FILE_TO_DIRECTORY: {
          return this.handleAddEmptyFileToDirectoryRequest(webviewView, data.value);
        }
        case ConstantsMessages.OPEN_FILE: {
          return this.handleOpenFileRequest(data);
        }
        case ConstantsMessages.ADD_SOLUTION_FOLDER: {
          return await SolutionModel.addSolutionFolder(data.value.solutionModel,
            data.value.solutionFolderName, () => {
              webviewView.webview.postMessage(data);
            });
        }
        case ConstantsMessages.ADD_PROJECT_TO_SOLUTION: {
          let z = 2;
          console.log();
          break;
        }
        case ConstantsMessages.ADD_PROJECT_TO_SOLUTION_FOLDER: {
          let z = 2;
          console.log();
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  public handleLoadCSharpProjectChildFilesResponse(webviewView: vscode.WebviewView, data: any, siblingFiles: any[]) {
    siblingFiles = siblingFiles
      .filter(x => x !== data.value.absoluteFilePath.fileNameWithExtension);

    let siblingAbsoluteFilePaths: AbsoluteFilePath[] = siblingFiles
      .map(x => data.value.absoluteFilePath.initialAbsoluteFilePathStringInput
        .replace(data.value.absoluteFilePath.fileNameWithExtension, x))
      .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null, null));

    data.value.childFiles = siblingAbsoluteFilePaths
      .map(absoluteFilePath => IdeFileFactory.constructIdeFile(absoluteFilePath));

    for (let i = data.value.childFiles.length - 1; i > -1; i--) {
      if (data.value.childFiles[i].fosterVirtualChildFiles) {
        data.value.childFiles[i].fosterVirtualChildFiles(data.value.childFiles);
      }
    }

    webviewView.webview.postMessage(data);
  }

  public handleGetChildFilesOfDirectoryResponse(webviewView: vscode.WebviewView, data: any, childFiles: any[]) {
    let childAbsoluteFilePaths: AbsoluteFilePath[] = childFiles
      .map(x => data.value.absoluteFilePath.initialAbsoluteFilePathStringInput +
        ConstantsFilePath.STANDARDIZED_FILE_DELIMITER +
        x)
      .map(x => new AbsoluteFilePath(x, FileSystemReader.isDir(x), null, null));

    data.value.childFiles = childAbsoluteFilePaths
      .map(absoluteFilePath => IdeFileFactory.constructIdeFile(absoluteFilePath));

    for (let i = data.value.childFiles.length - 1; i > -1; i--) {
      if (data.value.childFiles[i].fosterVirtualChildFiles) {
        data.value.childFiles[i].fosterVirtualChildFiles(data.value.childFiles);
      }
    }

    webviewView.webview.postMessage(data);
  }

  public handleOpenFileRequest(data: any) {
    const openPath = vscode.Uri.file(data.value.initialAbsoluteFilePathStringInput);

    vscode.workspace.openTextDocument(openPath).then(doc => {
      let textDocumentShowOptions: vscode.TextDocumentShowOptions = {
        "preserveFocus": false,
        "preview": false,
        "viewColumn": vscode.ViewColumn.One
      };

      vscode.window.showTextDocument(doc, textDocumentShowOptions);
    });
  }
  
  public handleAddEmptyFileToDirectoryRequest(webviewView: vscode.WebviewView, data: any) {
    let writePath: string = data.directory.absoluteFilePath.initialAbsoluteFilePathStringInput;

    if(!writePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)) {
      writePath += ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
    }
    
    writePath += data.filename;
    
    fs.writeFile(writePath, 
                 "", 
                 { flag: 'a+' }, 
                 (err: any) => {
        if (!err) {
          let absoluteFilePath = new AbsoluteFilePath(writePath, false, null, null);
          data.directory.childFiles.push(IdeFileFactory.constructIdeFile(absoluteFilePath));
          
          webviewView.webview.postMessage(ConstantsMessages.ConstructMessage(ConstantsMessages.ADD_EMPTY_FILE_TO_DIRECTORY, 
              data.directory));
        }
    });
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
    <link href="${dotNetIdeCssUri}" rel="stylesheet">
    <link href="${dotNetIdeSvelteAppCssUri}" rel="stylesheet">
	  <script>
		const tsVscode = acquireVsCodeApi();
	</script>
  </head>
  <body style="padding: 0 5px;" class="">
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