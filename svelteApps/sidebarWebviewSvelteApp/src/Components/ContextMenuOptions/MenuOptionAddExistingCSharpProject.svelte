<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageUpdateExistingCSharpProjectIntoSolution } from "../../../../../out/Messages/Update/MessageUpdateExistingCSharpProjectIntoSolution";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function createNewCSharpProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageUpdateExistingCSharpProjectIntoSolution =
                    new MessageUpdateExistingCSharpProjectIntoSolution(
                        contextMenuTargetValue
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageUpdateExistingCSharpProjectIntoSolution,
                });
        }

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={createNewCSharpProject}
        text="Add Existing C# Project."
    />
{/if}
