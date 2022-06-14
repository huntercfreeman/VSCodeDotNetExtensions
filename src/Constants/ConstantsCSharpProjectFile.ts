/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsCSharpProjectFile {
    public static readonly XML_INCLUDE_ATTRIBUTE_NAME: string = "Include";
    public static readonly XML_VERSION_ATTRIBUTE_NAME: string = "Version";
    
    /**
     * Nuget Package Reference Example text:
     * 
     *    <PropertyGroup>
     *        <TargetFramework>net6.0</TargetFramework>
     *        <Nullable>enable</Nullable>
     *        <ImplicitUsings>enable</ImplicitUsings>
     *        <RootNamespace>Blazor_Server_Side_Test</RootNamespace>
     *    </PropertyGroup>
     */
    public static readonly ROOT_NAMESPACE_TAG_NAME: string = "RootNamespace";
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
    public static readonly NUGET_PACKAGE_TAG_NAME: string = "PackageReference";
}