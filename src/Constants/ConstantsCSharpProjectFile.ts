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
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */
    public static readonly START_OF_NUGET_PACKAGE_REFERENCE_DEFINITION: string = "<PackageReference";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */
    public static readonly END_OF_NUGET_PACKAGE_REFERENCE_DEFINITION: string = "/>";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */
    public static readonly START_OF_NUGET_PACKAGE_REFERENCE_INCLUDE_DEFINITION: string = "Include=\"";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */
    public static readonly END_OF_NUGET_PACKAGE_REFERENCE_INCLUDE_DEFINITION: string = "\" ";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */
    public static readonly START_OF_NUGET_PACKAGE_REFERENCE_VERSION_DEFINITION: string = "Version=\"";
    /**
     * Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *     </ItemGroup>
     */
    public static readonly END_OF_NUGET_PACKAGE_REFERENCE_VERSION_DEFINITION: string = "\" ";
}