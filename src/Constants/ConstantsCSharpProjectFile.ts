/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsCSharpProjectFile {
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <ProjectReference Include="..\ClassLibraryStuff\ClassLibraryStuff.csproj" />
     *     </ItemGroup>
     */
    public static readonly START_OF_PROJECT_REFERENCE_DEFINITION: string = "<ProjectReference";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <ProjectReference Include="..\ClassLibraryStuff\ClassLibraryStuff.csproj" />
     *     </ItemGroup>
     */
    public static readonly END_OF_PROJECT_REFERENCE_DEFINITION: string = "/>";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <ProjectReference Include="..\ClassLibraryStuff\ClassLibraryStuff.csproj" />
     *     </ItemGroup>
     */
    public static readonly START_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION: string = "Include=\"";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <ProjectReference Include="..\ClassLibraryStuff\ClassLibraryStuff.csproj" />
     *     </ItemGroup>
     */
    public static readonly END_OF_PROJECT_REFERENCE_INCLUDE_DEFINITION: string = "\"";
}