<script lang="ts">
	import { onDestroy } from 'svelte';
    import { ConstantsFileExtensionsNoPeriod } from "../../../../../out/Constants/ConstantsFileExtensionsNoPeriod";
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateTemplatedFileInAny } from "../../../../../out/Messages/Create/MessageCreateTemplatedFileInAny";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;

    let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
    let shouldAddCodeBehind: boolean = false;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function beginFormAddFileWithTemplateNameOnClick() {
        addFileWithTemplateFilename = "";
    }

    $: hasRazorExtension = addFileWithTemplateFilename && 
               addFileWithTemplateFilename.endsWith(ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION);

    function addFileWithTemplateToFolderOnClick() {
        if (addFileWithTemplateFilename) {

            if (contextMenuTargetValue.fileKind === FileKind.directory || 
                contextMenuTargetValue.projectModel) {

                    let messageCreateTemplatedFileInAny =
                        new MessageCreateTemplatedFileInAny(
                            addFileWithTemplateFilename,
                            contextMenuTargetValue
                        );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageCreateTemplatedFileInAny,
                    });

                    if (shouldAddCodeBehind && hasRazorExtension) {
                        let messageCreateTemplatedFileInAny =
                            new MessageCreateTemplatedFileInAny(
                                addFileWithTemplateFilename + '.cs',
                                contextMenuTargetValue
                            );

                            tsVscode.postMessage({
                                type: undefined,
                                value: messageCreateTemplatedFileInAny,
                            }); 
                    }
            }

            closeMenu();
        }
    }

    onDestroy(unsubscribe);
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={beginFormAddFileWithTemplateNameOnClick}
        text="Create templated file."
    />
    {#if hasRazorExtension}
        Add a code behind?

        <input
            style="display: inline;"
            type="checkbox"
            bind:checked={shouldAddCodeBehind}
            on:keydown|stopPropagation
        />
    {/if}
    <TextInputForm
        bind:value={addFileWithTemplateFilename}
        onValidSubmit={addFileWithTemplateToFolderOnClick}
        placeholder="Filename with extension"
    />
{/if}
