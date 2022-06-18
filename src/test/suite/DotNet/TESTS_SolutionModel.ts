import * as vscode from 'vscode';

export function parseSlnTest() {
    const workspaceFolderZeroIndex = vscode.workspace.workspaceFolders?.[0];
    console.log("parseSlnTest");
}