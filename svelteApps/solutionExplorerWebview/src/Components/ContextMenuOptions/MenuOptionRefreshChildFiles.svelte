<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageReadVirtualFilesInProject } from "../../../../../out/Messages/Read/MessageReadVirtualFilesInProject";
    import { MessageReadFilesInDirectory } from "../../../../../out/Messages/Read/MessageReadFilesInDirectory";
    import { MessageReadVirtualFilesInSolution } from "../../../../../out/Messages/Read/MessageReadVirtualFilesInSolution";
    import { MessageReadProjectReferencesInProject } from "../../../../../out/Messages/Read/MessageReadProjectReferencesInProject";
    import { MessageReadNugetPackageReferencesInProject } from "../../../../../out/Messages/Read/MessageReadNugetPackageReferencesInProject";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    $: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;

    function refreshOnClick() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageReadVirtualFilesInSolution =
                    new MessageReadVirtualFilesInSolution(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadVirtualFilesInSolution,
                });
                break;
            case FileKind.fSharpProject:
            case FileKind.cSharpProject:
                let messageReadVirtualFilesInProject =
                    new MessageReadVirtualFilesInProject(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadVirtualFilesInProject,
                });

                break;
            case FileKind.projectReferencesList:
                let messageReadProjectReferencesInProject =
                    new MessageReadProjectReferencesInProject(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadProjectReferencesInProject,
                });
                break;
            case FileKind.nugetPackageDependenciesList:
                let messageReadNugetPackageReferencesInProject =
                    new MessageReadNugetPackageReferencesInProject(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadNugetPackageReferencesInProject,
                });
                break;
            case FileKind.directory:
                let messageReadFilesInDirectory =
                    new MessageReadFilesInDirectory(contextMenuTargetValue);

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadFilesInDirectory,
                });
                break;
        }

        closeMenu();
    }

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={refreshOnClick}
        text="Refresh Child Files."
        {idNamespace}
        {index}
        bind:isFocused={isFocused}
    />
{/if}
