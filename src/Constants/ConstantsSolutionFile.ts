/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsSolutionFile {
    /**
     * Example text: Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}")
     */
    public static readonly START_OF_PROJECT_DEFINITION: string = "Project(";
    /**
    * Example text: Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}")
    */
    public static readonly START_OF_GUID: string = "{";
    /**
    * Example text: Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}")
    */
    public static readonly END_OF_GUID: string = "}";


    /**
     * One must first check for ConstantsSolutionFile.START_OF_GLOBAL_SECTION as this is 
     * a substring of START_OF_GLOBAL_SECTION
     */
    public static readonly START_OF_GLOBAL: string = "Global";

    /**
     * Example text: GlobalSection(...)
     * where '...' is the name of the GlobalSection
     */
    public static readonly START_OF_GLOBAL_SECTION: string = "GlobalSection(";

    /**
     * GlobalSection(SolutionConfigurationPlatforms) = preSolution
     */
    public static readonly END_OF_GLOBAL_SECTION_TITLE: string = ")";

    /**
     * Example text: 
     *    {0CE91DF4-60BF-4A12-B15A-EBEEA5B50214} = {E893BAF0-1C89-4427-90C0-3AFDBBC5F706}
     *    EndGlobalSection
     *    GlobalSection(Extensi
     */
    public static readonly END_OF_GLOBAL_SECTION_ITSELF: string = "EndGlobalSection";

    /**
     * Example text: GlobalSection(SolutionProperties)
     */
    public static readonly START_OF_SOLUTION_PROPERTIES: string = "(SolutionProperties)";
    /**
     * Example text: GlobalSection(NestedProjects)
     */
    public static readonly START_OF_SOLUTION_FOLDERS: string = "(NestedProjects)";
    /**
     * Example text: GlobalSection(ExtensibilityGlobals)
     */
    public static readonly START_OF_EXTENSIBILITY_GLOBALS: string = "(ExtensibilityGlobals)";

    /**
     * Example Text:
     * 
     * Microsoft Visual Studio Solution File, Format Version 12.00
     * # Visual Studio Version 16
     * VisualStudioVersion = 16.0.28701.123
     * MinimumVisualStudioVersion = 10.0.40219.1
     */
    public static readonly START_OF_FILE_HEADER_TOKEN: string = "Microsoft Visual Studio Solution File";

    /**
     * Example Text:
     * 
     * Microsoft Visual Studio Solution File, Format Version 12.00
     * # Visual Studio Version 16
     * VisualStudioVersion = 16.0.28701.123
     * MinimumVisualStudioVersion = 10.0.40219.1
     */
    public static readonly START_OF_FORMAT_VERSION_TOKEN: string = "Format Version ";

    /**
     * Example Text:
     * 
     * Microsoft Visual Studio Solution File, Format Version 12.00
     * # Visual Studio Version 16
     * VisualStudioVersion = 16.0.28701.123
     * MinimumVisualStudioVersion = 10.0.40219.1
     */
    public static readonly START_OF_HASH_TAG_VISUAL_STUDIO_VERSION_TOKEN: string = "# Visual Studio Version ";

    /**
     * Example Text:
     * 
     * Microsoft Visual Studio Solution File, Format Version 12.00
     * # Visual Studio Version 16
     * VisualStudioVersion = 16.0.28701.123
     * MinimumVisualStudioVersion = 10.0.40219.1
     */
    public static readonly START_OF_VISUAL_STUDIO_VERSION_TOKEN: string = "VisualStudioVersion = ";

    /**
     * Example Text:
     * 
     * Microsoft Visual Studio Solution File, Format Version 12.00
     * # Visual Studio Version 16
     * VisualStudioVersion = 16.0.28701.123
     * MinimumVisualStudioVersion = 10.0.40219.1
     */
    public static readonly START_OF_MINIMUM_VISUAL_STUDIO_VERSION_TOKEN: string = "MinimumVisualStudioVersion = ";

    /**
     * Example Text:
     * 
     * Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BlazorStudio.Compiler.Tests", "Compiler\BlazorStudio.Compiler.Tests\BlazorStudio.Compiler.Tests.csproj", "{FB98F354-2FAF-4B68-81E9-D2B6CCE86DF5}"
     * EndProject
     */
    public static readonly START_OF_PROJECT_TOKEN: string = "Project(\"{";

    /**
     * Example Text:
     * 
     * Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BlazorStudio.Compiler.Tests", "Compiler\BlazorStudio.Compiler.Tests\BlazorStudio.Compiler.Tests.csproj", "{FB98F354-2FAF-4B68-81E9-D2B6CCE86DF5}"
     * EndProject
     */
    public static readonly START_OF_GUID_TOKEN: string = "{";

    /**
     * Example Text:
     * 
     * Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}") = "BlazorStudio.Compiler.Tests", "Compiler\BlazorStudio.Compiler.Tests\BlazorStudio.Compiler.Tests.csproj", "{FB98F354-2FAF-4B68-81E9-D2B6CCE86DF5}"
     * EndProject
     */
    public static readonly END_OF_GUID_TOKEN: string = "}";

    public static readonly GLOBAL_SECTION_TITLE_SOLUTION_CONFIGURATION_PLATFORMS: string = "SolutionConfigurationPlatforms";
    public static readonly GLOBAL_SECTION_TITLE_PROJECT_CONFIGURATION_PLATFORMS: string = "ProjectConfigurationPlatforms";
    public static readonly GLOBAL_SECTION_TITLE_SOLUTION_PROPERTIES: string = "SolutionProperties";
    public static readonly GLOBAL_SECTION_TITLE_NESTED_PROJECTS: string = "NestedProjects";
    public static readonly GLOBAL_SECTION_TITLE_EXTENSIBILITY_GOALS: string = "ExtensibilityGlobals";
}