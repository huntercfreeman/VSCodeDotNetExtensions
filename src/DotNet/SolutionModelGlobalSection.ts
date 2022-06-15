import { ExtensibilityGlobals } from "./ExtensibilityGlobals";
import { NestedProjects } from "./NestedProjects";
import { ProjectConfigurationPlatforms } from "./ProjectConfigurationPlatforms";
import { SolutionConfigurationPlatforms } from "./SolutionConfigurationPlatforms";
import { SolutionProperties } from "./SolutionProperties";

export class SolutionModelGlobalSection {
    /**
     * Given Example: GlobalSection(NestedProjects)
     * 
     * NestedProjects would be the title
     */
    public title: string = "";
    /**
     * Following example uses '...' to shorten example text
     * 
     * Given Example: ...eion(NestedProjects) = preSolution
     * 
     * preSolution would be the tenseSolution
     */
    public tenseSolution: string = "";
    public solutionConfigurationPlatforms: SolutionConfigurationPlatforms | undefined;
    public projectConfigurationPlatforms: ProjectConfigurationPlatforms | undefined;
    public solutionProperties: SolutionProperties | undefined;
    public nestedProjects: NestedProjects | undefined;
    public extensibilityGlobals: ExtensibilityGlobals | undefined;
}