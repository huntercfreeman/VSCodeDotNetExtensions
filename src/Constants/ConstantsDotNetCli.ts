import { NugetPackageModel } from "../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../DotNet/NugetPackageVersionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../FileSystem/Files/DotNetSolutionFile";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsDotNetCli {
    public static formatDotNetRunProject(projectAbsoluteFilePath: AbsoluteFilePath): string {
        return `dotnet run --project \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }

    public static formatDotNetNewSolution(solutionNameWithoutExtension: string): string {
        if (solutionNameWithoutExtension) {
            return `dotnet new sln -o \"${solutionNameWithoutExtension}\"`;
        }

        return `dotnet new sln`;
    }

    public static formatDotNetNewProject(projectNameWithoutExtension: string,
        templateName: string,
        lang: string | undefined): string {

        let langString = lang
            ? `-lang "${lang}"`
            : "";

        return `dotnet new ${templateName} ${langString} -o \"${projectNameWithoutExtension}\"`;
    }

    public static formatDotNetAddProjectToSolutionUsingProjectName(projectNameNoExtension: string, projectNameWithExtension: string, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" add \"${projectNameNoExtension}/${projectNameWithExtension}\"`;
    }
    
    public static formatDotNetAddFSharpProjectToSolutionUsingProjectName(projectNameWithoutExtension: string, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" add \"${projectNameWithoutExtension}/${projectNameWithoutExtension}.fsproj\"`;
    }

    public static formatDotNetRemoveProjectFromSolutionUsingProjectName(projectNameWithoutExtension: string, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" remove \"${projectNameWithoutExtension}/${projectNameWithoutExtension}.csproj\"`;
    }

    public static formatDotNetRemoveProjectFromSolutionUsingProjectUsingAbsoluteFilePath(projectAbsoluteFilePath: AbsoluteFilePath, dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" remove \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }

    public static formatDotNetAddProjectToSolutionUsingProjectFsPath(projectFsPath: string, dotNetSolutionFile: DotNetSolutionFile): string {

        return `dotnet sln \"${dotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput}\" add \"${projectFsPath}\"`;
    }
    
    public static formatDotNetAddProjectReferenceToProject(receivingProjectAbsoluteFilePath: AbsoluteFilePath, referenceProjectAbsoluteFilePathString: string): string {

        return `dotnet add \"${receivingProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" reference \"${referenceProjectAbsoluteFilePathString}\"`;
    }

    /**
     * 
     * I'm working on something else right now but are 
     * these variable names correct? They seem nonsensically named.
     * 
     */
    public static formatDotNetRemoveProjectReferenceFromProject(parentProjectInitialAbsoluteFilePath: AbsoluteFilePath, projectReferenceAbsoluteFilePath: AbsoluteFilePath): string {

        return `dotnet remove \"${parentProjectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" reference \"${projectReferenceAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }
    
    public static formatDotNetPutProjectInSolutionFolder(projectAbsoluteFilePath: AbsoluteFilePath, 
        dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath,
        solutionFolderName: string): string {

        return `dotnet sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` +
               ` add \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` +
               ` --solution-folder \"${solutionFolderName}\"`;
    }

    public static formatDotNetAddNugetPackageReferenceToProject(projectInitialAbsoluteFilePath: AbsoluteFilePath,
        nugetPackageModel: NugetPackageModel,
        nugetPackageVersionModel: NugetPackageVersionModel): string {

        return `dotnet add \"${projectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" package \"${nugetPackageModel.id}\" --version ${nugetPackageVersionModel.version}`;
    }

    public static formatDotNetRemoveNugetPackageReferenceFromProject(projectInitialAbsoluteFilePath: AbsoluteFilePath, nugetPackageId: string): string {

        return `dotnet remove \"${projectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\" package \"${nugetPackageId}\"`;
    }

    public static DOT_NET_NEW_LIST = "dotnet new --list";
}