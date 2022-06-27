<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateRemoveNugetPackageReference } from "../../../../../out/Messages/Update/MessageUpdateRemoveNugetPackageReference";

    export let closeMenu;

    $: contextMenuTargetValue = $contextMenuTarget;

    let showPrompt: boolean = false;

    function removeNugetPackageReference() {
        let messageUpdateRemoveNugetPackageReference =
            new MessageUpdateRemoveNugetPackageReference(
                contextMenuTargetValue
            );

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateRemoveNugetPackageReference,
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
        text="Remove Nuget Package Reference."
    />

    {#if showPrompt}
        <div>
            <em>Remove</em> Reference:

            <div style="margin-left: 12px;">
                <em
                    >{contextMenuTargetValue.absoluteFilePath
                        .filenameWithExtension}</em
                >
            </div>
        </div>
        <div>
            From Project:

            <div style="margin-left: 12px;">
                {contextMenuTargetValue
                    .parentProjectInitialAbsoluteFilePath
                    .filenameWithExtension}
            </div>
        </div>

        <button on:keydown|stopPropagation on:click={removeNugetPackageReference}>Accept</button>
        <button on:keydown|stopPropagation on:click={performCloseMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
