/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsSolutionFile {
    /**
     * Example text: Project("{9A19103F-16F7-4668-BE54-9A1E7A4F7556}")
     */
    public static readonly START_OF_PROJECT_DEFINITION: string = "Project(\"{";
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
    public static readonly START_OF_GLOBAL_SECTION: string = "GlobalSection";

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
}