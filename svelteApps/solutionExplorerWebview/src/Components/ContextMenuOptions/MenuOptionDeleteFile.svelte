<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { MessageDeleteAny } from "../../../../../out/Messages/Delete/MessageDeleteAny";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    $: contextMenuTargetValue = $contextMenuTarget;

    let showPrompt: boolean = false;

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

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={showConfirmQuestion}
        text="Delete."
        {idNamespace}
        {index}
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

        <DotNetIdeButton onClickCallback={deleteFile}>
            Accept
        </DotNetIdeButton>

        <DotNetIdeButton onClickCallback={performCloseMenu}>
            Decline
        </DotNetIdeButton>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
