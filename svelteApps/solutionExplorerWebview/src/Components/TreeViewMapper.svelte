<script lang="ts">
    import { FileKind } from "../../../../out/FileSystem/FileKind";
    import type { VCXProjectFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFile";
    import type { CSharpProjectDependenciesListFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectDependenciesListFile";
    import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
    import type { CSharpProjectNugetPackageDependenciesListFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectNugetPackageDependenciesListFile";
    import type { CSharpProjectNugetPackageDependencyFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectNugetPackageDependencyFile";
    import type { CSharpProjectProjectReferenceFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectProjectReferenceFile";
    import type { CSharpProjectProjectReferencesListFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectProjectReferencesListFile";
    import type { DirectoryFile } from "../../../../out/FileSystem/Files/DirectoryFile";
    import type { DotNetSolutionFile } from "../../../../out/FileSystem/Files/DotNetSolutionFile";
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
    import type { SolutionFolderFile } from "../../../../out/FileSystem/Files/SolutionFolderFile";
    import VcxProjectTreeView from "./TreeViews/CPlusPlus/VCXProjectTreeView.svelte";
    import CSharpProjectDependenciesListTreeView from "./TreeViews/CSharp/CSharpProjectDependenciesListTreeView.svelte";
    import CSharpProjectNugetPackageDependenciesListTreeView from "./TreeViews/CSharp/CSharpProjectNugetPackageDependenciesListTreeView.svelte";
    import CSharpProjectNugetPackageDependencyTreeView from "./TreeViews/CSharp/CSharpProjectNugetPackageDependencyTreeView.svelte";
    import CSharpProjectProjectReferencesListTreeView from "./TreeViews/CSharp/CSharpProjectProjectReferencesListTreeView.svelte";
    import CSharpProjectProjectReferenceTreeView from "./TreeViews/CSharp/CSharpProjectProjectReferenceTreeView.svelte";
    import CSharpProjectTreeView from "./TreeViews/CSharp/CSharpProjectTreeView.svelte";
    import DefaultFileTreeView from "./TreeViews/DefaultFileTreeView.svelte";
    import DirectoryTreeView from "./TreeViews/DirectoryTreeView.svelte";
    import SolutionFileTreeView from "./TreeViews/DotNetSolutionTreeView.svelte";
    import SolutionFolderTreeView from "./TreeViews/SolutionFolderTreeView.svelte";

    export let ideFile: IdeFile;

    $: dotNetSolutionFile = ideFile as DotNetSolutionFile;
    $: solutionFolderFile = ideFile as SolutionFolderFile;
    $: cSharpProjectFile = ideFile as CSharpProjectFile;
    $: vcxProjectFile = ideFile as VCXProjectFile;
    $: directoryFile = ideFile as DirectoryFile;
    $: cSharpProjectDependenciesListFile = ideFile as CSharpProjectDependenciesListFile;
    $: cSharpProjectNugetPackageDependenciesListFile = ideFile as CSharpProjectNugetPackageDependenciesListFile;
    $: cSharpProjectNugetPackageDependencyFile = ideFile as CSharpProjectNugetPackageDependencyFile;
    $: cSharpProjectProjectReferencesListFile = ideFile as CSharpProjectProjectReferencesListFile;
    $: cSharpProjectProjectReferenceFile = ideFile as CSharpProjectProjectReferenceFile;
</script>

{#if ideFile.fileKind === FileKind.solution}
    <SolutionFileTreeView dotNetSolutionFile={dotNetSolutionFile} />

{:else if ideFile.fileKind === FileKind.solutionFolder}
    <SolutionFolderTreeView solutionFolderFile={solutionFolderFile} />

{:else if ideFile.fileKind === FileKind.cSharpProject}
    <CSharpProjectTreeView cSharpProjectFile={cSharpProjectFile} />

{:else if ideFile.fileKind === FileKind.vcxProject}
    <VcxProjectTreeView vcxProjectFile={vcxProjectFile} />

<!-- {:else if ideFile.fileKind === FileKind.vcxProject}]
    <VCX -->

{:else if ideFile.fileKind === FileKind.directory}
    <DirectoryTreeView directoryFile={directoryFile} />

{:else if ideFile.fileKind === FileKind.projectDependencies}
    <CSharpProjectDependenciesListTreeView cSharpProjectDependenciesListFile={cSharpProjectDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.nugetPackageDependenciesList}
    <CSharpProjectNugetPackageDependenciesListTreeView cSharpProjectNugetPackageDependenciesListFile={cSharpProjectNugetPackageDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.nugetPackageDependency}
    <CSharpProjectNugetPackageDependencyTreeView cSharpProjectNugetPackageDependencyFile={cSharpProjectNugetPackageDependencyFile} />

{:else if ideFile.fileKind === FileKind.projectReferencesList}
    <CSharpProjectProjectReferencesListTreeView cSharpProjectProjectReferencesListFile={cSharpProjectProjectReferencesListFile} />

{:else if ideFile.fileKind === FileKind.projectReference}
    <CSharpProjectProjectReferenceTreeView cSharpProjectProjectReferenceFile={cSharpProjectProjectReferenceFile} />

{:else}
    <DefaultFileTreeView ideFile={ideFile} />
{/if}