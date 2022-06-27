<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateCutAny } from "../../../../../out/Messages/Update/MessageUpdateCutAny";

    export let closeMenu;

    let contextMenuTargetValue;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function cutOnClick() {
        let messageUpdateCutAny =
            new MessageUpdateCutAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateCutAny,
        });

        closeMenu();
    }

    onDestroy(unsubscribe);
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={cutOnClick}
        text="Cut."
    />
{/if}
