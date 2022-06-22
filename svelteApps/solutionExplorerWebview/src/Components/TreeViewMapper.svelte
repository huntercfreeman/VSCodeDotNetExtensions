<script lang="ts">
    import { FileKind } from "../../../../out/FileSystem/FileKind";
    import type { VCXProjectExternalDependenciesListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectExternalDependenciesListFile";
    import type { VCXProjectFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectFile";
    import type { VCXProjectHeaderFilesListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectHeaderFilesListFile";
    import type { VCXProjectReferencesListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectReferencesListFile";
    import type { VCXProjectResourceFilesListFile } from "../../../../out/FileSystem/Files/CPlusPlus/VCXProjectResourceFilesListFile";
    import type { CSharpProjectDependenciesListFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectDependenciesListFile";
    import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharp/CSharpProjectFile";
    import type { DirectoryFile } from "../../../../out/FileSystem/Files/DirectoryFile";
    import type { DotNetSolutionFile } from "../../../../out/FileSystem/Files/DotNetSolutionFile";
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
    import type { SolutionFolderFile } from "../../../../out/FileSystem/Files/SolutionFolderFile";
    import VcxProjectExternalDependenciesListTreeView from "./TreeViews/CPlusPlus/VCXProjectExternalDependenciesListTreeView.svelte";
    import VcxProjectHeaderFilesListTreeView from "./TreeViews/CPlusPlus/VCXProjectHeaderFilesListTreeView.svelte";
    import VcxProjectReferencesListTreeView from "./TreeViews/CPlusPlus/VCXProjectReferencesListTreeView.svelte";
    import VcxProjectResourceFilesListTreeView from "./TreeViews/CPlusPlus/VCXProjectResourceFilesListTreeView.svelte";
    import VcxProjectTreeView from "./TreeViews/CPlusPlus/VCXProjectTreeView.svelte";
    import CSharpProjectDependenciesListTreeView from "./TreeViews/CSharp/CSharpProjectDependenciesListTreeView.svelte";
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

    export let ideFile: IdeFile;

    $: dotNetSolutionFile = ideFile as DotNetSolutionFile;
    $: solutionFolderFile = ideFile as SolutionFolderFile;
    $: cSharpProjectFile = ideFile as CSharpProjectFile;
    $: vcxProjectFile = ideFile as VCXProjectFile;
    $: directoryFile = ideFile as DirectoryFile;
    $: cSharpProjectDependenciesListFile = ideFile as CSharpProjectDependenciesListFile;
    $: projectNugetPackageDependenciesListFile = ideFile as ProjectNugetPackageDependenciesListFile;
    $: projectNugetPackageDependencyFile = ideFile as ProjectNugetPackageDependencyFile;
    $: projectToProjectReferencesListFile = ideFile as ProjectToProjectReferencesListFile;
    $: projectToProjectReferenceFile = ideFile as ProjectToProjectReferenceFile;
    $: vcxProjectExternalDependenciesListFile = ideFile as VCXProjectExternalDependenciesListFile;
    $: vcxProjectHeaderFilesListFile = ideFile as VCXProjectHeaderFilesListFile;
    $: vcxProjectReferencesListFile = ideFile as VCXProjectReferencesListFile;
    $: vcxProjectResourceFilesListFile = ideFile as VCXProjectResourceFilesListFile;
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

<!-- {:else if ideFile.fileKind === FileKind.vcxProject}]
    <VCX -->

{:else if ideFile.fileKind === FileKind.directory}
    <DirectoryTreeView directoryFile={directoryFile} />

{:else if ideFile.fileKind === FileKind.cSharpProjectDependencies}
    <CSharpProjectDependenciesListTreeView cSharpProjectDependenciesListFile={cSharpProjectDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.nugetPackageDependenciesList}
    <ProjectNugetPackageDependenciesListTreeView projectNugetPackageDependenciesListFile={projectNugetPackageDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.nugetPackageDependency}
    <ProjectNugetPackageDependencyTreeView projectNugetPackageDependencyFile={projectNugetPackageDependencyFile} />

{:else if ideFile.fileKind === FileKind.projectReferencesList}
    <ProjectToProjectReferencesListTreeView projectToProjectReferencesListFile={projectToProjectReferencesListFile} />

{:else if ideFile.fileKind === FileKind.projectReference}
    <ProjectToProjectReferenceTreeView projectToProjectReferenceFile={projectToProjectReferenceFile} />

    <!-- START OF C++ ------------------------------------------------------------------------------------------------------------------------->

{:else if ideFile.fileKind === FileKind.vcxProjectExternalDependenciesListFile}
    <VcxProjectExternalDependenciesListTreeView vcxProjectExternalDependenciesListFile={vcxProjectExternalDependenciesListFile} />

{:else if ideFile.fileKind === FileKind.vcxProjectHeaderFilesListFile}
    <VcxProjectHeaderFilesListTreeView vcxProjectHeaderFilesListFile={vcxProjectHeaderFilesListFile} />

{:else if ideFile.fileKind === FileKind.vcxProjectReferencesListFile}
    <VcxProjectReferencesListTreeView vcxProjectReferencesListFile={vcxProjectReferencesListFile} />

{:else if ideFile.fileKind === FileKind.vcxProjectResourceFilesListFile}
    <VcxProjectResourceFilesListTreeView vcxProjectResourceFilesListFile={vcxProjectResourceFilesListFile} />

{:else if ideFile.fileKind === FileKind.vcxProjectSourceFilesListFile}
    <ProjectToProjectReferenceTreeView projectToProjectReferenceFile={projectToProjectReferenceFile} />

{:else}
    <DefaultFileTreeView ideFile={ideFile} />
{/if}