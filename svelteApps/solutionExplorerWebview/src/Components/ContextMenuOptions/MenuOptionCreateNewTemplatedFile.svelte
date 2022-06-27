<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from "../../../../../out/Constants/ConstantsFileExtensionsNoPeriod";
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateTemplatedFileInAny } from "../../../../../out/Messages/Create/MessageCreateTemplatedFileInAny";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
import DotNetIdeInputCheckbox from "../MaterialDesign/DotNetIdeInputCheckbox.svelte";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    let addFileWithTemplateFilename: string | undefined;
    let shouldAddCodeBehind: boolean = false;

	$: contextMenuTargetValue = $contextMenuTarget;

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

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={beginFormAddFileWithTemplateNameOnClick}
        text="Create templated file."
        {idNamespace}
        {index}
    />
    {#if hasRazorExtension}
        Add a code behind?

        <DotNetIdeInputCheckbox styleCss="display: inline;"
                                bind:isExpanded={shouldAddCodeBehind}/>
    {/if}
    <TextInputForm
        bind:value={addFileWithTemplateFilename}
        onValidSubmit={addFileWithTemplateToFolderOnClick}
        placeholder="Filename with extension"
    />
{/if}
