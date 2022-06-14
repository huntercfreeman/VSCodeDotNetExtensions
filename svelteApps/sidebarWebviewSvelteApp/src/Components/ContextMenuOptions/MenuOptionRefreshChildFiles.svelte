<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageReadVirtualFilesInCSharpProject } from "../../../../../out/Messages/Read/MessageReadVirtualFilesInCSharpProject";
    import { MessageReadFilesInDirectory } from "../../../../../out/Messages/Read/MessageReadFilesInDirectory";
    import { MessageReadVirtualFilesInSolution } from "../../../../../out/Messages/Read/MessageReadVirtualFilesInSolution";
    import { MessageReadProjectReferencesInProject } from "../../../../../out/Messages/Read/MessageReadProjectReferencesInProject";
    import { MessageReadNugetPackageReferencesInProject } from "../../../../../out/Messages/Read/MessageReadNugetPackageReferencesInProject";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

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
            case FileKind.cSharpProject:
                let messageReadVirtualFilesInCSharpProject =
                    new MessageReadVirtualFilesInCSharpProject(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadVirtualFilesInCSharpProject,
                });
                break;
            case FileKind.projectReferences:
                let messageReadProjectReferencesInProject =
                    new MessageReadProjectReferencesInProject(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageReadProjectReferencesInProject,
                });
                break;
            case FileKind.nugetPackageDependencies:
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
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={refreshOnClick}
        text="Refresh Child Files."
    />
{/if}
