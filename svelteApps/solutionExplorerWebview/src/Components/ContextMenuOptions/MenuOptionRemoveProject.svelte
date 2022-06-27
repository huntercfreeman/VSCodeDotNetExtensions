<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { MessageUpdateRemoveProject } from "../../../../../out/Messages/Update/MessageUpdateRemoveProject";

    export let closeMenu;

    $: contextMenuTargetValue = $contextMenuTarget;

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
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={showConfirmQuestion}
        text="Remove Project (no files are deleted)."
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

        <button on:keydown|stopPropagation on:click={removeProject}>Accept</button>
        <button on:keydown|stopPropagation on:click={performCloseMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
