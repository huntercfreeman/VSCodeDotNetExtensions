<script lang="ts">
    import { FileKind } from "../../../../out/FileSystem/FileKind";
    import FileProjectIcon from "./Icons/ProjectIcon.svelte";
    import FileSolutionIcon from "./Icons/SolutionIcon.svelte";
    import FileDirectoryIcon from "./Icons/DirectoryIcon.svelte";
    import FileCsIcon from "./Icons/CsIcon.svelte";
    import FileCshtmlIcon from "./Icons/CshtmlIcon.svelte";
    import FileRazorIcon from "./Icons/RazorIcon.svelte";
    import FileCssIcon from "./Icons/CssIcon.svelte";
    import FileTxtIcon from "./Icons/TxtIcon.svelte";
    import FileSolutionFolderIcon from "./Icons/SolutionFolderIcon.svelte";
    import FileJsonIcon from "./Icons/JsonIcon.svelte";
import FileProjectDependenciesIcon from "./Icons/ProjectDependenciesIcon.svelte";
import FileNugetPackageDependencyIcon from "./Icons/NugetPackageDependencyIcon.svelte";
import FileNugetPackageDependenciesIcon from "./Icons/NugetPackageDependenciesIcon.svelte";
import FileProjectReferencesIcon from "./Icons/ProjectReferencesIcon.svelte";
import FileProjectReferenceIcon from "./Icons/ProjectReferenceIcon.svelte";

    export let fileKind: typeof FileKind;
</script>

{#if fileKind === FileKind.solution}
    <FileSolutionIcon />
{:else if fileKind === FileKind.cSharpProject}
    <FileProjectIcon />
{:else if fileKind === FileKind.solutionFolder}
    <FileSolutionFolderIcon />
{:else if fileKind === FileKind.default}
    <FileTxtIcon />
{:else if fileKind === FileKind.directory}
    <FileDirectoryIcon />
{:else if fileKind === FileKind.cSharp}
    <FileCsIcon />
{:else if fileKind === FileKind.cshtml}
    <FileCshtmlIcon />
{:else if fileKind === FileKind.razor}
    <FileRazorIcon />
{:else if fileKind === FileKind.css}
    <FileCssIcon />
{:else if fileKind === FileKind.json}
    <FileJsonIcon />
{:else if fileKind === FileKind.projectDependencies}
    <FileProjectDependenciesIcon />
{:else if fileKind === FileKind.nugetPackageDependencies}
    <FileNugetPackageDependenciesIcon />
{:else if fileKind === FileKind.nugetPackageDependency}
    <FileNugetPackageDependencyIcon />
{:else if fileKind === FileKind.projectReferences}
    <FileProjectReferencesIcon />
{:else if fileKind === FileKind.projectReference}
    <FileProjectReferenceIcon />
{/if}
