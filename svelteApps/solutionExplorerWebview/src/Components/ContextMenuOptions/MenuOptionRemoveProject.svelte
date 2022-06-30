<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { MessageUpdateRemoveProject } from "../../../../../out/Messages/Update/MessageUpdateRemoveProject";

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

    function removeProject() {
        let messageUpdateRemoveProject = new MessageUpdateRemoveProject(
            contextMenuTargetValue
        );

        tsVscode.postMessage({
            type: undefined,
            value: messageUpdateRemoveProject,
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
            text="Remove Project (no files are deleted)."
            {namespaceId}
            {index}
            {category}
            bind:isFocused={isFocused}
        />

        {#if showPrompt}
            <div>
                <em>Remove</em> Project:

                <div style="margin-left: 12px;">
                    <em
                        >{contextMenuTargetValue.projectModel.absoluteFilePath
                            .filenameWithExtension}</em
                    >
                </div>
            </div>
            <div>
                From Solution:

                <div style="margin-left: 12px;">
                    {contextMenuTargetValue.projectModel
                        .parentSolutionAbsoluteFilePath.filenameWithExtension}
                </div>
            </div>

            <DotNetIdeButton onClickCallback={removeProject}>
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
