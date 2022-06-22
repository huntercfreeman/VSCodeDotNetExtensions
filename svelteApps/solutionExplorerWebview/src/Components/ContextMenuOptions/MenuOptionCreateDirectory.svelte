<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateDirectoryInAny } from "../../../../../out/Messages/Create/MessageCreateDirectoryInAny";
    import { DirectoryFile } from "../../../../../out/FileSystem/Files/DirectoryFile";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;

    let contextMenuTargetValue;
    let createDirectoryFilename: string | undefined;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function beginFormCreateDirectoryOnClick() {
        createDirectoryFilename = "";
    }

    function createDirectoryOnClick() {
        if (createDirectoryFilename) {
            if (contextMenuTargetValue.fileKind === FileKind.directory || 
                contextMenuTargetValue.projectModel) {
                    let messageCreateDirectoryInAny =
                        new MessageCreateDirectoryInAny(
                            createDirectoryFilename,
                            contextMenuTargetValue
                        );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageCreateDirectoryInAny,
                    });
                }

            closeMenu();
        }
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={beginFormCreateDirectoryOnClick}
        text="Create Directory."
    />
    <TextInputForm
        bind:value={createDirectoryFilename}
        onValidSubmit={createDirectoryOnClick}
        placeholder="Directory name"
    />
{/if}
