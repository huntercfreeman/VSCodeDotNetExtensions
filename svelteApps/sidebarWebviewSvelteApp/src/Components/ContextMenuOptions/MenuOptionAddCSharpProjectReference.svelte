<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateAddProjectReference } from "../../../../../out/Messages/Update/MessageUpdateAddProjectReference";

    export let closeMenu;

    let contextMenuTargetValue;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function addProjectReference() {
        let messageUpdateAddProjectReference =
            new MessageUpdateAddProjectReference(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateAddProjectReference,
        });

        closeMenu();
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={addProjectReference}
        text="Add Project Reference."
    />
{/if}
