<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateAddProjectReference } from "../../../../../out/Messages/Update/MessageUpdateAddProjectReference";

    export let closeMenu;
    export let namespaceId: string;
    export let index: number;
	export let category;

    let contextMenuTargetValue;

	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";

    let isFocused = false;
    
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
    <div class="dni_menu-option {isFocusedCssClass}">
        <MenuOption
            onClickStopPropagation={true}
            onClick={addProjectReference}
			{closeMenu}
            text="Add Project Reference."
            {namespaceId}
            {index}
            {category}
            bind:isFocused={isFocused}
        />
    </div>
{/if}
