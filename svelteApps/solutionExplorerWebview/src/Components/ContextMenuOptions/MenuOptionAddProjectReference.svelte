<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateAddProjectReference } from "../../../../../out/Messages/Update/MessageUpdateAddProjectReference";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    let contextMenuTargetValue;

	$: contextMenuTargetValue = $contextMenuTarget;

    function addProjectReference() {
        let messageUpdateAddProjectReference =
            new MessageUpdateAddProjectReference(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateAddProjectReference,
        });

        closeMenu();
    }

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={addProjectReference}
        text="Add Project Reference."
        {idNamespace}
        {index}
    />
{/if}
