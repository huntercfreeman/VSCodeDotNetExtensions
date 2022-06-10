import { AbsoluteFilePath } from "../FileSystem/AbsoluteFilePath";

/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsDotNetCli {
    public static formatDotNetRunCSharpProject(cSharpProjectAbsoluteFilePath: AbsoluteFilePath): string {
        return `dotnet run --project ${cSharpProjectAbsoluteFilePath.initialAbsoluteFilePathStringInput}`;
    }
}