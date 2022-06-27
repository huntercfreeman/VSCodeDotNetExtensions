<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageExecuteProjectWithoutDebugging } from "../../../../../out/Messages/Execute/MessageExecuteProjectWithoutDebugging"
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    $: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
        
    let isFocused = false;

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

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startWithoutDebugging}
        text="Start without debugging."
        {idNamespace}
        {index}
        bind:isFocused={isFocused}
    />
{/if}
