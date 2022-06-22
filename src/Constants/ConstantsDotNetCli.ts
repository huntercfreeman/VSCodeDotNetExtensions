import { NugetPackageModel } from "../DotNet/NugetPackageModel";
import { NugetPackageVersionModel } from "../DotNet/NugetPackageVersionModel";
import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../FileSystem/Files/DotNetSolutionFile";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsDotNetCli {;
    public static readonly DOTNET_CLI: string = "dotnet";

    public static formatRunProject(projectAbsoluteFilePath: AbsoluteFilePath): string {
        return `${this.DOTNET_CLI} run --project` + 
               ` \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }

    public static formatNewSolution(solutionNameWithoutExtension: string): string {
        if (solutionNameWithoutExtension) {
            return `${this.DOTNET_CLI} new sln` + 
                   ` -o \"${solutionNameWithoutExtension}\"`;
        }

        return `${this.DOTNET_CLI} new sln`;
    }

    public static formatNewProject(projectNameWithoutExtension: string,
        templateName: string,
        lang: string | undefined): string {

        let langString = lang
            ? `-lang "${lang}"`
            : "";

        return `${this.DOTNET_CLI} new ${templateName}` + 
               ` ${langString}` + 
               ` -o \"${projectNameWithoutExtension}\"`;
    }

    public static formatAddProjectToSolutionUsingProjectName(projectNameNoExtension: string, 
        projectFileExtensionNoPeriod: string, 
        dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `${this.DOTNET_CLI} sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` add \"${projectNameNoExtension}/${projectNameNoExtension}.${projectFileExtensionNoPeriod}\"`;
    }

    public static formatRemoveProjectFromSolutionUsingProjectName(projectNameNoExtension: string, 
        projectFileExtensionNoPeriod: string, 
        dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `${this.DOTNET_CLI} sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` remove \"${projectNameNoExtension}/.${projectFileExtensionNoPeriod}\"`;
    }

    public static formatRemoveProjectFromSolutionUsingProjectUsingAbsoluteFilePath(projectAbsoluteFilePath: AbsoluteFilePath, 
        dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath): string {

        return `${this.DOTNET_CLI} sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
        ` remove \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }

    public static formatAddProjectToSolutionUsingProjectFsPath(projectFsPath: string, 
        dotNetSolutionFile: DotNetSolutionFile): string {

        return `${this.DOTNET_CLI} sln \"${dotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` add \"${projectFsPath}\"`;
    }
    
    public static formatAddProjectReferenceToProject(receivingProjectAbsoluteFilePath: AbsoluteFilePath, 
        referenceProjectAbsoluteFilePathString: string): string {

        return `${this.DOTNET_CLI} add \"${receivingProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` reference \"${referenceProjectAbsoluteFilePathString}\"`;
    }

    public static formatRemoveProjectReferenceFromProject(receivingProjectAbsoluteFilePath: AbsoluteFilePath, 
        referenceProjectAbsoluteFilePath: AbsoluteFilePath): string {

        return `${this.DOTNET_CLI} remove \"${receivingProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` reference \"${referenceProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"`;
    }
    
    public static formatPutProjectInSolutionFolder(projectAbsoluteFilePath: AbsoluteFilePath, 
        dotNetSolutionFileAbsoluteFilePath: AbsoluteFilePath,
        solutionFolderName: string): string {

        return `${this.DOTNET_CLI} sln \"${dotNetSolutionFileAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` +
               ` add \"${projectAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` +
               ` --solution-folder \"${solutionFolderName}\"`;
    }

    public static formatAddNugetPackageReferenceToProject(projectInitialAbsoluteFilePath: AbsoluteFilePath,
        nugetPackageModel: NugetPackageModel,
        nugetPackageVersionModel: NugetPackageVersionModel): string {

        return `${this.DOTNET_CLI} add \"${projectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` package \"${nugetPackageModel.id}\"` + 
               ` --version ${nugetPackageVersionModel.version}`;
    }

    public static formatRemoveNugetPackageReferenceFromProject(projectInitialAbsoluteFilePath: AbsoluteFilePath, 
        nugetPackageId: string): string {

        return `${this.DOTNET_CLI} remove \"${projectInitialAbsoluteFilePath.initialAbsoluteFilePathStringInput}\"` + 
               ` package \"${nugetPackageId}\"`;
    }

    public static readonly DOT_NET_NEW_LIST = "dotnet new --list";

    public static readonly LANG_F_SHARP = "F#";
}