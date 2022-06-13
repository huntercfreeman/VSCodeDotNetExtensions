/* eslint-disable @typescript-eslint/naming-convention */
export class ConstantsXmlFile {
    /**
     * xml of Nuget Package Reference Example text:
     * 
     *     <ItemGroup>
     *         <PackageReference Include="Fluxor" Version="5.4.0" />
     *         <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3">
     *             <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
     *             <PrivateAssets>all</PrivateAssets>
     *         </PackageReference>
     *     </ItemGroup>
     */

    public static readonly START_OF_XML_TAG: string = "<";
    public static readonly ENDINGS_OF_XML_TAG: string[] = [">", "/>"];
    public static readonly START_OF_XML_TAG_ATTRIBUTE: string = "\"";
    public static readonly END_OF_XML_TAG_ATTRIBUTE: string = "/>";
}
