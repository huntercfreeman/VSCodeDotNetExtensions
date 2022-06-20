<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageReadProjectIntoXmlEditor } from "../../../../../out/Messages/Read/MessageReadProjectIntoXmlEditor";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function startWithoutDebugging() {
        if ((contextMenuTargetValue as any).projectModel) {

            if (contextMenuTargetValue.fileKind === FileKind.solutionFolder) {
                return;
            }

            // IProjectModel
            let projectModel: any = (contextMenuTargetValue as any).projectModel;

            let messageReadProjectIntoXmlEditor =
                new MessageReadProjectIntoXmlEditor(
                    projectModel
                );

            tsVscode.postMessage({
                type: undefined,
                value: messageReadProjectIntoXmlEditor,
            });
        }

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startWithoutDebugging}
        text="Properties"
    />
{/if}
