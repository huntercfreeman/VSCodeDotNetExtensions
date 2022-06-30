<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateCutAny } from "../../../../../out/Messages/Update/MessageUpdateCutAny";

    export let closeMenu;
    export let namespaceId: string;
    export let index: number;
	export let category;

	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;

    function cutOnClick() {
        let messageUpdateCutAny =
            new MessageUpdateCutAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateCutAny,
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
            onClick={cutOnClick}
			{closeMenu}
            text="Cut."
            {namespaceId}
            {index}
            {category}
            bind:isFocused={isFocused}
        />
    </div>
{/if}
