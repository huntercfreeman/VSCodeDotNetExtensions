<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { MessageUpdateRemoveProjectReference } from "../../../../../out/Messages/Update/MessageUpdateRemoveProjectReference";

    export let closeMenu;
    export let namespaceId: string;
    export let index: number;
	export let category;

    $: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;

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
    <div class="dni_menu-option {isFocusedCssClass}">
        <MenuOption
            onClickStopPropagation={true}
            onClick={showConfirmQuestion}
			{closeMenu}
            text="Remove Project Reference."
            {namespaceId}
            {index}
            {category}
            bind:isFocused={isFocused}
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
    </div>
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
