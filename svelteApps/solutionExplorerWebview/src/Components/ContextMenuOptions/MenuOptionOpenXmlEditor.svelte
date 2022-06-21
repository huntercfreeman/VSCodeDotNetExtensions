<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageReadOpenXmlEditor } from "../../../../../out/Messages/Read/MessageReadOpenXmlEditor";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function openXmlEditor() {
        if ((contextMenuTargetValue as any).projectModel) {

            if (contextMenuTargetValue.fileKind === FileKind.solutionFolder) {
                return;
            }

            // IProjectModel
            let projectModel: any = (contextMenuTargetValue as any).projectModel;

            let messageReadOpenXmlEditor =
                new MessageReadOpenXmlEditor(
                    projectModel
                );

            tsVscode.postMessage({
                type: undefined,
                value: messageReadOpenXmlEditor,
            });
        }

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={openXmlEditor}
        text="Open XML Editor"
    />
{/if}
