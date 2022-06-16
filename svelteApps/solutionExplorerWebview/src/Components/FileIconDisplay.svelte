<script lang="ts">
    import { FileKind } from "../../../../out/FileSystem/FileKind";
    import ProjectIcon from "./Icons/ProjectIcon.svelte";
    import SolutionIcon from "./Icons/SolutionIcon.svelte";
    import DirectoryIcon from "./Icons/DirectoryIcon.svelte";
    import CsIcon from "./Icons/CsIcon.svelte";
    import CshtmlIcon from "./Icons/CshtmlIcon.svelte";
    import RazorIcon from "./Icons/RazorIcon.svelte";
    import CssIcon from "./Icons/CssIcon.svelte";
    import TxtIcon from "./Icons/TxtIcon.svelte";
    import SolutionFolderIcon from "./Icons/SolutionFolderIcon.svelte";
    import JsonIcon from "./Icons/JsonIcon.svelte";
    import ProjectDependenciesIcon from "./Icons/ProjectDependenciesIcon.svelte";
    import NugetPackageDependencyIcon from "./Icons/NugetPackageDependencyIcon.svelte";
    import NugetPackageDependenciesIcon from "./Icons/NugetPackageDependenciesIcon.svelte";
    import ProjectReferencesIcon from "./Icons/ProjectReferencesIcon.svelte";
    import ProjectReferenceIcon from "./Icons/ProjectReferenceIcon.svelte";
    import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
    import WwwRootIcon from "./Icons/WwwRootIcon.svelte";
    import { ConstantsUniqueFiles } from "../../../../out/Constants/ConstantsUniqueFiles";

    export let ideFile: IdeFile;

    $: fileKind = ideFile.fileKind;
</script>

{#if fileKind === FileKind.solution}
    <SolutionIcon />
{:else if fileKind === FileKind.cSharpProject}
    <ProjectIcon />
{:else if fileKind === FileKind.solutionFolder}
    <SolutionFolderIcon />
{:else if fileKind === FileKind.default}
    <TxtIcon />
{:else if fileKind === FileKind.directory}
    {#if ideFile.absoluteFilePath.filenameNoExtension === ConstantsUniqueFiles.WWW_ROOT_FILENAME_NO_EXTENSION}
        <WwwRootIcon />
    {:else}
        <DirectoryIcon />
    {/if}
{:else if fileKind === FileKind.cSharp}
    <CsIcon />
{:else if fileKind === FileKind.cshtml}
    <CshtmlIcon />
{:else if fileKind === FileKind.razor}
    <RazorIcon />
{:else if fileKind === FileKind.css}
    <CssIcon />
{:else if fileKind === FileKind.json}
    <JsonIcon />
{:else if fileKind === FileKind.projectDependencies}
    <ProjectDependenciesIcon />
{:else if fileKind === FileKind.nugetPackageDependencies}
    <NugetPackageDependenciesIcon />
{:else if fileKind === FileKind.nugetPackageDependency}
    <NugetPackageDependencyIcon />
{:else if fileKind === FileKind.projectReferences}
    <ProjectReferencesIcon />
{:else if fileKind === FileKind.projectReference}
    <ProjectReferenceIcon />
{/if}
