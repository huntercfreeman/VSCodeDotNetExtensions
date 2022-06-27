<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdateExistingProjectIntoSolution } from "../../../../../out/Messages/Update/MessageUpdateExistingProjectIntoSolution";

    export let closeMenu;

    let contextMenuTargetValue;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

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

    onDestroy(unsubscribe);
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={addExistingProject}
        text="Add Existing Project."
    />
{/if}
