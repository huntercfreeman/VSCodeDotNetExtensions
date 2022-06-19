import * as vscode from 'vscode';
import { NugetPackageModel } from "../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../DotNet/NugetPackageVersionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../FileSystem/Files/DotNetSolutionFile";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsDotNetCli {
    public static getEnvShellAbsolutePathString() {
        return vscode.env.shell;
    }
    
    public static getEnvShellRunCommandIfPreviousCommandIsSuccessfulOperator() {
        
        let envShellAbsolutePathString = this.getEnvShellAbsolutePathString();
        
        if (envShellAbsolutePathString.indexOf("bash") !== -1) {
            return '&&';
        }
        else if (envShellAbsolutePathString.indexOf("bash") !== -1) {
            return '&&';
        }
        else {
            return '&&';
        }
    }

    public static formatDotNetRunCSharpProject(cSharpProjectAbsoluteFilePath: AbsoluteFilePath): string {
        return `dotnet run --project \"${cSharpProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }

    public static formatDotNetNewSolution(solutionNameWithoutExtension: string): string {
        if (solutionNameWithoutExtension) {
            return `dotnet new sln -o \"${solutionNameWithoutExtension}\"`;
        }

        return `dotnet new sln`;
    }

    public static formatDotNetNewCSharpProject(projectNameWithoutExtension: string,
        templateName: string): string {

        return `dotnet new ${templateName} -o \"${projectNameWithoutExtension}\"`;
    }

    public static formatDotNetAddCSharpProjectToSolutionUsingProjectName(projectNameWithoutExtension: string, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" add \"${projectNameWithoutExtension}/${projectNameWithoutExtension}.csproj\"`;
    }

    public static formatDotNetRemoveCSharpProjectFromSolutionUsingProjectName(projectNameWithoutExtension: string, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" remove \"${projectNameWithoutExtension}/${projectNameWithoutExtension}.csproj\"`;
    }

    public static formatDotNetRemoveCSharpProjectFromSolutionUsingProjectUsingAbsoluteFilePath(projectAbsoluteFilePath: AbsoluteFilePath, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" remove \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }

    public static formatDotNetAddCSharpProjectToSolutionUsingProjectFsPath(projectFsPath: string, dotNetSolutionFile: DotNetSolutionFile): string {

        return `dotnet sln \"${dotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput}\" add \"${projectFsPath}\"`;
    }
    
    public static formatDotNetAddCSharpProjectReferenceToCSharpProject(receivingProjectAbsoluteFilePath: AbsoluteFilePath, referenceProjectAbsoluteFilePathString: string): string {

        return `dotnet add \"${receivingProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" reference \"${referenceProjectAbsoluteFilePathString}\"`;
    }

    /**
     * 
     * I'm working on something else right now but are 
     * these variable names correct? They seem nonsensically named.
     * 
     */
    public static formatDotNetRemoveCSharpProjectReferenceFromCSharpProject(parentCSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath, cSharpProjectReferenceAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet remove \"${parentCSharpProjectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" reference \"${cSharpProjectReferenceAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }
    
    public static formatDotNetPutProjectInSolutionFolder(projectAbsoluteFilePath: AbsoluteFilePath, 
        dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath,
        solutionFolderName: string): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` +
               ` add \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` +
               ` --solution-folder \"${solutionFolderName}\"`;
    }

    public static formatDotNetAddNugetPackageReferenceToCSharpProject(cSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath,
        nugetPackageModel: NugetPackageModel,
        nugetPackageVersionModel: NugetPackageVersionModel): string {

        return `dotnet add \"${cSharpProjectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" package \"${nugetPackageModel.id}\" --version ${nugetPackageVersionModel.version}`;
    }

    public static formatDotNetRemoveNugetPackageReferenceFromCSharpProject(cSharpProjectInitialAbsoluteFilePath: AbsoluteFilePath, nugetPackageId: string): string {

        return `dotnet remove \"${cSharpProjectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" package \"${nugetPackageId}\"`;
    }

    public static DOT_NET_NEW_LIST = "dotnet new --list";
}