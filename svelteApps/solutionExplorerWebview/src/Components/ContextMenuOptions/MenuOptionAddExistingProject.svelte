<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdateExistingProjectIntoSolution } from "../../../../../out/Messages/Update/MessageUpdateExistingProjectIntoSolution";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;
    
	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";

    let isFocused = false;

    function addExistingProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageUpdateExistingProjectIntoSolution =
                    new MessageUpdateExistingProjectIntoSolution(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageUpdateExistingProjectIntoSolution,
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
        onClick={addExistingProject}
        text="Add Existing Project."
        {idNamespace}
        {index}
        bind:isFocused={isFocused}
    />
{/if}
