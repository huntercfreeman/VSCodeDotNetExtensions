<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { MessageUpdateRemoveProjectReference } from "../../../../../out/Messages/Update/MessageUpdateRemoveProjectReference";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    $: contextMenuTargetValue = $contextMenuTarget;

    let showPrompt: boolean = false;

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

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={showConfirmQuestion}
        text="Remove Project Reference."
        {idNamespace}
        {index}
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

        <DotNetIdeButton onClickCallback={removeProjectReference}>
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
