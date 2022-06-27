<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateCopyAny } from "../../../../../out/Messages/Update/MessageUpdateCopyAny";

    export let closeMenu;

    let contextMenuTargetValue;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function copyOnClick() {
        let messageUpdateCopyAny =
            new MessageUpdateCopyAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateCopyAny,
        });

        closeMenu();
    }

    onDestroy(unsubscribe);
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={copyOnClick}
        text="Copy."
    />
{/if}
