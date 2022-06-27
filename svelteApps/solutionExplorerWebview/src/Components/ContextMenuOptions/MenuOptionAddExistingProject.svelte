<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdateExistingProjectIntoSolution } from "../../../../../out/Messages/Update/MessageUpdateExistingProjectIntoSolution";

    export let closeMenu;

	$: contextMenuTargetValue = $contextMenuTarget;

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
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={addExistingProject}
        text="Add Existing Project."
    />
{/if}
