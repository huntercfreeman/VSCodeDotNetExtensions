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
}