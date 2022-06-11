import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";

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
    
    public static formatDotNetAddCSharpProjectToSolution(projectNameWithoutExtension: string): string {

        return `dotnet sln add ${projectNameWithoutExtension}/${projectNameWithoutExtension}.csproj`;
    }
    
    public static DOT_NET_NEW_LIST = "dotnet new --list";
}