<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateCopyAny } from "../../../../../out/Messages/Update/MessageUpdateCopyAny";

    export let closeMenu;
    export let namespaceId: string;
    export let index: number;
	export let category;

	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;
    
    function copyOnClick() {
        let messageUpdateCopyAny =
            new MessageUpdateCopyAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateCopyAny,
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
            onClick={copyOnClick}
			{closeMenu}
            text="Copy."
            {namespaceId}
            {index}
            {category}
            bind:isFocused={isFocused}
        />
    </div>
{/if}
