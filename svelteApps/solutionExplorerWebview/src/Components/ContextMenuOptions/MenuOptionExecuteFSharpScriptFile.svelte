<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import MenuOption from "../MenuOption.svelte";
    import { MessageExecuteFSharpScript } from "../../../../../out/Messages/Execute/MessageExecuteFSharpScript";

    export let closeMenu;

    $: contextMenuTargetValue = $contextMenuTarget;

    let showPrompt: boolean = false;

    function executeFSharpScript() {
        let messageExecuteFSharpScript =
            new MessageExecuteFSharpScript(contextMenuTargetValue);

        tsVscode.postMessage({
            type: undefined,
            value: messageExecuteFSharpScript,
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
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={showConfirmQuestion}
        text="Execute Script."
    />

    {#if showPrompt}
        <div>
            <em>Execute F#</em> script:

            <div style="margin-left: 12px;">
                <em
                    >{contextMenuTargetValue
                        .absoluteFilePath
                        .filenameWithExtension}</em
                >
            </div>
        </div>

        <DotNetIdeButton onClickCallback={executeFSharpScript}>
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
