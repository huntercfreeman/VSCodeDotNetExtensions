<script lang="ts">
    import { FileKind } from "../../../out/FileSystem/FileKind";
    import FileProjectIcon from "./Icons/FileProjectIcon.svelte";
    import FileSolutionIcon from "./Icons/FileSolutionIcon.svelte";
    import FileDirectoryIcon from "./Icons/FileDirectoryIcon.svelte";
    import FileCsIcon from "./Icons/FileCsIcon.svelte";
    import FileCshtmlIcon from "./Icons/FileCshtmlIcon.svelte";
    import FileRazorIcon from "./Icons/FileRazorIcon.svelte";
    import FileCssIcon from "./Icons/FileCssIcon.svelte";
    import FileTxtIcon from "./Icons/FileTxtIcon.svelte";
    import FileSolutionFolderIcon from "./Icons/FileSolutionFolderIcon.svelte";
    import FileJsonIcon from "./Icons/FileJsonIcon.svelte";

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
{/if}
