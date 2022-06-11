import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";
import { DotNetSolutionFile } from "../FileSystem/Files/DotNetSolutionFile";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsDotNetCli {
    public static formatDotNetRunCSharpProject(cSharpProjectAbsoluteFilePath: AbsoluteFilePath): string {
        return `dotnet run --project ${cSharpProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}`;
    }
    
    public static formatDotNetNewSolution(solutionNameWithoutExtension: string): string {
        if (solutionNameWithoutExtension) {
            return `dotnet new sln -o ${solutionNameWithoutExtension}`;
        }

        return `dotnet new sln`;
    }
    
    public static formatDotNetNewCSharpProject(projectNameWithoutExtension: string,
        templateName: string): string {

        return `dotnet new ${templateName} -o ${projectNameWithoutExtension}`;
    }
    
    public static formatDotNetAddCSharpProjectToSolutionUsingProjectName(projectNameWithoutExtension: string, dotNetSolutionFile: DotNetSolutionFile): string {

        return `dotnet sln ${dotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput} add ${projectNameWithoutExtension}/${projectNameWithoutExtension}.csproj`;
    }
    
    public static formatDotNetAddCSharpProjectToSolutionUsingProjectFsPath(projectFsPath: string, dotNetSolutionFile: DotNetSolutionFile): string {

        return `dotnet sln ${dotNetSolutionFile.absoluteFilePath.initialAbsoluteFilePathStringInput} add ${projectFsPath}`;
    }
    
    public static DOT_NET_NEW_LIST = "dotnet new --list";
}