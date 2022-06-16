<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from "../../../../../out/Constants/ConstantsFileExtensionsNoPeriod";
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateTemplatedFileInAny } from "../../../../../out/Messages/Create/MessageCreateTemplatedFileInAny";
    import type { DirectoryFile } from "../../../../../out/FileSystem/Files/DirectoryFile";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;

    let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
    let shouldAddCodeBehind: boolean = false;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function beginFormAddFileWithTemplateNameOnClick() {
        addFileWithTemplateFilename = "";
    }

    function addFileWithTemplateToFolderOnClick() {
        if (addFileWithTemplateFilename) {
            switch (contextMenuTargetValue.fileKind) {
                case FileKind.cSharpProject:
                case FileKind.directory:
                    let messageCreateTemplatedFileInAny =
                    new MessageCreateTemplatedFileInAny(
                        addFileWithTemplateFilename,
                        contextMenuTargetValue
                    );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageCreateTemplatedFileInAny,
                    });
            }

            closeMenu();
        }
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={beginFormAddFileWithTemplateNameOnClick}
        text="Create templated file."
    />
    <TextInputForm
        bind:value={addFileWithTemplateFilename}
        onValidSubmit={addFileWithTemplateToFolderOnClick}
        placeholder="Filename with extension"
    />
    {#if addFileWithTemplateFilename && addFileWithTemplateFilename.endsWith(ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION)}
        Add a code behind?

        <input
            style="display: inline;"
            type="checkbox"
            bind:checked={shouldAddCodeBehind}
        />

        shouldAddCodeBehind: {shouldAddCodeBehind}
    {/if}
{/if}
