<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageExecuteProjectDebugging } from "../../../../../out/Messages/Execute/MessageExecuteProjectDebugging";

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

            let messageExecuteProjectDebugging =
                new MessageExecuteProjectDebugging(
                    projectModel
                );

            tsVscode.postMessage({
                type: undefined,
                value: messageExecuteProjectDebugging,
            });
        }

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startWithoutDebugging}
        text="Start debugging."
    />
{/if}
