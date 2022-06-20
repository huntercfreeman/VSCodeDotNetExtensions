<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageExecuteProjectWithoutDebugging } from "../../../../../out/Messages/Execute/MessageExecuteCSharpProjectWithoutDebugging";
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

            let messageExecuteProjectWithoutDebugging =
                new MessageExecuteProjectWithoutDebugging(
                    projectModel
                );

            tsVscode.postMessage({
                type: undefined,
                value: messageExecuteProjectWithoutDebugging,
            });
        }

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startWithoutDebugging}
        text="Start without debugging."
    />
{/if}
