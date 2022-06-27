<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateRemoveProjectReference } from "../../../../../out/Messages/Update/MessageUpdateRemoveProjectReference";

    export let closeMenu;

    let contextMenuTargetValue;
    let showPrompt: boolean = false;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function removeProjectReference() {
        let messageUpdateRemoveProjectReference =
            new MessageUpdateRemoveProjectReference(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateRemoveProjectReference,
        });

        performCloseMenu();
    }

    function showConfirmQuestion() {
        showPrompt = true;
    }

    function performCloseMenu() {
        showPrompt = false;
        closeMenu();
    }

    onDestroy(unsubscribe);
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={showConfirmQuestion}
        text="Remove Project Reference."
    />

    {#if showPrompt}
        <div>
            <em>Remove</em> Reference:

            <div style="margin-left: 12px;">
                <em
                    >{contextMenuTargetValue
                        .referenceProjectAbsoluteFilePath
                        .filenameWithExtension}</em
                >
            </div>
        </div>
        <div>
            From Project:

            <div style="margin-left: 12px;">
                {contextMenuTargetValue
                    .receivingProjectInitialAbsoluteFilePath
                    .filenameWithExtension}
            </div>
        </div>

        <button on:keydown|stopPropagation on:click={removeProjectReference}>Accept</button>
        <button on:keydown|stopPropagation on:click={performCloseMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
