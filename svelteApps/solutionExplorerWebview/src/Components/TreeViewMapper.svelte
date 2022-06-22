<script lang="ts">
    import { FileKind } from "../../../../out/FileSystem/FileKind";
    import type { VCXProjectExternalDependenciesListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectExternalDependenciesListFile";
    import type { VCXProjectFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFile";
    import type { VCXProjectReferencesListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectReferencesListFile";
    import type { CSharpProjectDependenciesListFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectDependenciesListFile";
    import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
    import type { FSharpProjectDependenciesListFile } from "../../../../out/FileSystem/Files/FSharp/FSharpProjectDependenciesListFile";
    import type { DirectoryFile } from "../../../../out/FileSystem/Files/DirectoryFile";
    import type { DotNetSolutionFile } from "../../../../out/FileSystem/Files/DotNetSolutionFile";
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
    import type { SolutionFolderFile } from "../../../../out/FileSystem/Files/SolutionFolderFile";
    import VcxProjectExternalDependenciesListTreeView from "./TreeViews/CPlusPlus/VCXProjectExternalDependenciesListTreeView.svelte";
    import VCXProjectFilterListTreeView from "./TreeViews/CPlusPlus/VCXProjectFilterListTreeView.svelte";
    import VcxProjectReferencesListTreeView from "./TreeViews/CPlusPlus/VCXProjectReferencesListTreeView.svelte";
    import VcxProjectTreeView from "./TreeViews/CPlusPlus/VCXProjectTreeView.svelte";
    import CSharpProjectDependenciesListTreeView from "./TreeViews/CSharp/CSharpProjectDependenciesListTreeView.svelte";
    import FSharpProjectDependenciesListTreeView from "./TreeViews/FSharp/FSharpProjectDependenciesListTreeView.svelte";
    import ProjectNugetPackageDependenciesListTreeView from "./TreeViews/Nuget/ProjectNugetPackageDependenciesListTreeView.svelte";
    import ProjectNugetPackageDependencyTreeView from "./TreeViews/Nuget/ProjectNugetPackageDependencyTreeView.svelte";
    import CSharpProjectTreeView from "./TreeViews/CSharp/CSharpProjectTreeView.svelte";
    import DefaultFileTreeView from "./TreeViews/DefaultFileTreeView.svelte";
    import DirectoryTreeView from "./TreeViews/DirectoryTreeView.svelte";
    import DotNetSolutionTreeView from "./TreeViews/DotNetSolutionTreeView.svelte";
    import DotNetSolutionFolderTreeView from "./TreeViews/DotNetSolutionFolderTreeView.svelte";
    import ProjectToProjectReferencesListTreeView from "./TreeViews/ProjectReference/ProjectToProjectReferencesListTreeView.svelte";
    import ProjectToProjectReferenceTreeView from "./TreeViews/ProjectReference/ProjectToProjectReferenceTreeView.svelte";
    import FSharpProjectTreeView from "./TreeViews/FSharp/FSharpProjectTreeView.svelte";
    import type { FSharpProjectFile } from "../../../../out/FileSystem/Files/FSharp/FSharpProjectFile";
    import type { ProjectNugetPackageDependenciesListFile } from "../../../../out/FileSystem/Files/Nuget/ProjectNugetPackageDependenciesListFile";
    import type { ProjectNugetPackageDependencyFile } from "../../../../out/FileSystem/Files/Nuget/ProjectNugetPackageDependencyFile";
    import type { ProjectToProjectReferencesListFile } from "../../../../out/FileSystem/Files/ProjectReference/ProjectToProjectReferencesListFile";
    import type { ProjectToProjectReferenceFile } from "../../../../out/FileSystem/Files/ProjectReference/ProjectToProjectReferenceFile";
    import type { VCXProjectFilterListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFilterListFile";
    import type { VCXProjectFilterFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFilterFile";

    export let ideFile: IdeFile;

    $: dotNetSolutionFile = ideFile as DotNetSolutionFile;
    $: solutionFolderFile = ideFile as SolutionFolderFile;
    $: cSharpProjectFile = ideFile as CSharpProjectFile;
    $: vcxProjectFile = ideFile as VCXProjectFile;
    $: directoryFile = ideFile as DirectoryFile;
    $: cSharpProjectDependenciesListFile = ideFile as CSharpProjectDependenciesListFile;
    $: fSharpProjectDependenciesListFile = ideFile as FSharpProjectDependenciesListFile;
    $: projectNugetPackageDependenciesListFile = ideFile as ProjectNugetPackageDependenciesListFile;
    $: projectNugetPackageDependencyFile = ideFile as ProjectNugetPackageDependencyFile;
    $: projectToProjectReferencesListFile = ideFile as ProjectToProjectReferencesListFile;
    $: projectToProjectReferenceFile = ideFile as ProjectToProjectReferenceFile;
    $: vcxProjectExternalDependenciesListFile = ideFile as VCXProjectExternalDependenciesListFile;
    $: vcxProjectFilterListFile = ideFile as VCXProjectFilterListFile;
    $: vcxProjectFilterFile = ideFile as VCXProjectFilterFile;
    $: vcxProjectReferencesListFile = ideFile as VCXProjectReferencesListFile;
    $: fSharpProjectFile = ideFile as FSharpProjectFile;
</script>

{#if ideFile.fileKind === FileKind.solution}
    <DotNetSolutionTreeView dotNetSolutionFile={dotNetSolutionFile} />

{:else if ideFile.fileKind === FileKind.solutionFolder}
    <DotNetSolutionFolderTreeView solutionFolderFile={solutionFolderFile} />

{:else if ideFile.fileKind === FileKind.cSharpProject}
    <CSharpProjectTreeView cSharpProjectFile={cSharpProjectFile} />

{:else if ideFile.fileKind === FileKind.fSharpProject}
    <FSharpProjectTreeView fSharpProjectFile={fSharpProjectFile} />

{:else if ideFile.fileKind === FileKind.vcxProject}
    <VcxProjectTreeView vcxProjectFile={vcxProjectFile} />

{:else if ideFile.fileKind === FileKind.directory}
    <DirectoryTreeView directoryFile={directoryFile} />

{:else if ideFile.fileKind === FileKind.cSharpProjectDependencies}
    <CSharpProjectDependenciesListTreeView cSharpProjectDependenciesListFile={cSharpProjectDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.fSharpProjectDependencies}
    <FSharpProjectDependenciesListTreeView fSharpProjectDependenciesListFile={fSharpProjectDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.nugetPackageDependenciesList}
    <ProjectNugetPackageDependenciesListTreeView projectNugetPackageDependenciesListFile={projectNugetPackageDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.nugetPackageDependency}
    <ProjectNugetPackageDependencyTreeView projectNugetPackageDependencyFile={projectNugetPackageDependencyFile} />

{:else if ideFile.fileKind === FileKind.projectReferencesList}
    <ProjectToProjectReferencesListTreeView projectToProjectReferencesListFile={projectToProjectReferencesListFile} />

{:else if ideFile.fileKind === FileKind.projectReference}
    <ProjectToProjectReferenceTreeView projectToProjectReferenceFile={projectToProjectReferenceFile} />

{:else if ideFile.fileKind === FileKind.vcxProjectReferencesListFile}
    <VcxProjectReferencesListTreeView vcxProjectReferencesListFile={vcxProjectReferencesListFile} />

{:else if ideFile.fileKind === FileKind.vcxProjectExternalDependenciesListFile}
    <VcxProjectExternalDependenciesListTreeView vcxProjectExternalDependenciesListFile={vcxProjectExternalDependenciesListFile} />
    
{:else if ideFile.fileKind === FileKind.vcxProjectFilterListFile}
    <VCXProjectFilterListTreeView vcxProjectFilterListFile={vcxProjectFilterListFile} />

<!-- {:else if ideFile.fileKind === FileKind.vcxProjectResourceFilesListFile}
    <VCXProjectFilterTreeView vcxProjectFilterFile={vcxProjectFilterFile} /> -->

{:else}
    <DefaultFileTreeView ideFile={ideFile} />
{/if}