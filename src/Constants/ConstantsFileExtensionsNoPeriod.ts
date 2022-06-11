/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsFileExtensionsNoPeriod {
    public static readonly C_SHARP_PROJECT_FILE_EXTENSION: string = "csproj";
    public static readonly SOLUTION_FILE_EXTENSION: string = "sln";
    public static readonly C_SHARP_FILE_EXTENSION: string = "cs";
    public static readonly CSHMTL_FILE_EXTENSION: string = "cshtml";
    public static readonly CSS_FILE_EXTENSION: string = "css";
    // TODO: Directories should always end in a '/' except when accessing filenameWithoutExtension
    public static readonly DIRECTORY_FILE_EXTENSION: string = "/";
    public static readonly RAZOR_FILE_EXTENSION: string = "razor";
    public static readonly RAZOR__CODEBEHIND_FILE_EXTENSION: string = "razor.cs";
    public static readonly JSON_FILE_EXTENSION: string = "json";
    public static readonly PROJECT_DEPENDENCIES_FILE_EXTENSION: string = "dependencies";
    public static readonly NUGET_PACKAGE_DEPENDENCIES_FILE_EXTENSION: string = "nugetPackages";
    public static readonly NUGET_PACKAGE_DEPENDENCY_FILE_EXTENSION: string = "nugetPackageEntry";
}