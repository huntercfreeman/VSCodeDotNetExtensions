/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsCSharpProjectFile {
    public static readonly START_OF_XML_INCLUDE_ATTRIBUTE: string = "Include";
    public static readonly START_OF_VERSION_ATTRIBUTE: string = "Version";
    
    /**
     * ProjectReference Example text:
     * 
     *     <ItemGroup>
     *         <ProjectReference Include="..\ClassLibraryStuff\ClassLibraryStuff.csproj" />
     *     </ItemGroup>
     */
    public static readonly PROJECT_REFERENCE_TAG_NAME: string = "ProjectReference";
    /**
     * Nuget Package Reference Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *         <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3">
     *             <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
     *             <PrivateAssets>all</PrivateAssets>
     *         </PackageReference>
     *     </ItemGroup>
     */
    public static readonly START_OF_NUGET_PACKAGE_REFERENCE_DEFINITION: string = "PackageReference";
}