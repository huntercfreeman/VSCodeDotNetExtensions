<script lang="ts">
	import { onDestroy } from 'svelte';
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageDeleteAny } from "../../../../../out/Messages/Delete/MessageDeleteAny";

    export let closeMenu;

    let contextMenuTargetValue;
    let showPrompt: boolean = false;

    const unsubscribe = contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function deleteFile() {
        let messageDeleteAny =
            new MessageDeleteAny(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageDeleteAny,
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
        text="Delete."
    />

    {#if showPrompt}
        <div>
            <em>Delete</em> file:

            <div style="margin-left: 12px;">
                <em
                    >{contextMenuTargetValue
                        .absoluteFilePath
                        .filenameWithExtension}</em
                >
            </div>
        </div>

        <button on:keydown|stopPropagation on:click={deleteFile}>Accept</button>
        <button on:keydown|stopPropagation on:click={performCloseMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
