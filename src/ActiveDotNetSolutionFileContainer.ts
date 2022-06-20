import * as vscode from 'vscode';
import { ConstantsFilePath } from './Constants/ConstantsFilePath';
import { FilePathStandardizer } from './FileSystem/FilePathStandardizer';
import { DotNetSolutionFile } from "./FileSystem/Files/DotNetSolutionFile";

export class ActiveDotNetSolutionFileContainer {
    private static activeDotNetSolutionFile: DotNetSolutionFile | undefined;
    private static solutionFileWatcher: vscode.FileSystemWatcher | undefined;
    
    private static setActiveDotNetSolutionFileCallCounter: number = 0;

    public static solutionExplorerWebviewProviderSubscription: 
        ((activeDotNetSolutionFile: DotNetSolutionFile | undefined) => void) | undefined;

    public static nugetPackageManagerWebviewProviderSubscription: 
        ((activeDotNetSolutionFile: DotNetSolutionFile | undefined) => void) | undefined;

    // TODO: I like this property more than having each webview get its own property to store the subscription.
    // my issue with this property however is that one has to dispose() the subscription when the user 'collapses'
    // the webview and then resubscribe when they 'expand' the webview. It gets a bit 'in the weeds' for an array
    // that will as of now only contain two webviews: the solution explorer, and the Nuget Package Manager.
    // 
    // By giving each webview its own property for their subscription to the .sln state changes
    // the webview can, before subscribing check if there is an active subscription and dispose if there is.
    //
    // private static solutionFileChangeSubscriptions: 
    //     ((activeDotNetSolutionFile: DotNetSolutionFile | undefined) => void)[];

    public static setActiveDotNetSolutionFile(dotNetSolutionFile: DotNetSolutionFile | undefined) {

        console.log("setActiveDotNetSolutionFileCallCounter: " + ++this.setActiveDotNetSolutionFileCallCounter);

        let absoluteFilePathOfSolutionFileChanged: boolean = false;

        if (this.activeDotNetSolutionFile && dotNetSolutionFile) {
            absoluteFilePathOfSolutionFileChanged =  
                this.activeDotNetSolutionFile?.absoluteFilePath.initialAbsoluteFilePathStringInput === 
                dotNetSolutionFile?.absoluteFilePath.initialAbsoluteFilePathStringInput;
        }
        else if (!this.activeDotNetSolutionFile || !dotNetSolutionFile) {

            // if only one is undefined the .sln changed.
            if (!(this.activeDotNetSolutionFile && dotNetSolutionFile)) {
                absoluteFilePathOfSolutionFileChanged = true;
            }
        }

        this.activeDotNetSolutionFile = dotNetSolutionFile;

        if (absoluteFilePathOfSolutionFileChanged) {

                // If not undefined create new file watcher for .sln
                if (this.activeDotNetSolutionFile) {
                    const workspaceFolderZeroIndex = vscode.workspace.workspaceFolders?.[0];

                if (workspaceFolderZeroIndex) {
        
                    let workspaceStandardizedFilePath = FilePathStandardizer.standardizeFilePath(workspaceFolderZeroIndex.uri.fsPath);

                    let folderUriFsPath = workspaceStandardizedFilePath.endsWith(ConstantsFilePath.STANDARDIZED_FILE_DELIMITER)
                        ? workspaceStandardizedFilePath
                        : workspaceStandardizedFilePath + ConstantsFilePath.STANDARDIZED_FILE_DELIMITER;
            
                    let relativePathToSolutionFile = 
                        this.activeDotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput
                            .replace(folderUriFsPath, "");
        
                    this.solutionFileWatcher?.dispose();

                    this.solutionFileWatcher = vscode.workspace.createFileSystemWatcher(
                        new vscode.RelativePattern(workspaceFolderZeroIndex, 
                            relativePathToSolutionFile));
            
                    this.solutionFileWatcher.onDidChange(async uri => { 
            
                        if(this.solutionExplorerWebviewProviderSubscription) {
                            this.solutionExplorerWebviewProviderSubscription(this.activeDotNetSolutionFile);
                        }
                        
                        if(this.nugetPackageManagerWebviewProviderSubscription) {
                            this.nugetPackageManagerWebviewProviderSubscription(this.activeDotNetSolutionFile);
                        }
                    });
                }
            }
            else {
                // if new active .sln is undefined when previous
                // was not undefined dispose previous filewatcher

                this.solutionFileWatcher?.dispose();
            }
        }
        
        if(this.nugetPackageManagerWebviewProviderSubscription) {
            this.nugetPackageManagerWebviewProviderSubscription(this.activeDotNetSolutionFile);
        }
    }

    public static notifySubscriptions() {
        
    }

    public static getActiveDotNetSolutionFile() {
        return this.activeDotNetSolutionFile;
    }
}