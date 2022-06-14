<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageCreateSolutionFolderInAny } from "../../../../../out/Messages/Create/MessageCreateSolutionFolderInAny";

    export let closeMenu;

    let contextMenuTargetValue;
    let createNewSolutionFolderName: string | undefined;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function createNewSolutionFolder() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageCreateSolutionFolderInAny =
                    new MessageCreateSolutionFolderInAny(
                        contextMenuTargetValue,
                        createNewSolutionFolderName
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageCreateSolutionFolderInAny,
                });
        }

        closeMenu();
    }

    function startFormCreateNewSolutionFolder() {
        createNewSolutionFolderName = "";
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startFormCreateNewSolutionFolder}
        text="New Solution Folder"
    />

    {#if createNewSolutionFolderName !== undefined}
        <input
            placeholder="Name for Solution Folder"
            bind:value={createNewSolutionFolderName}
        />

        <div>
            <div>
                <div>Create Solution Folder:</div>
                <div style="margin-left: 12px;">
                    <em>{createNewSolutionFolderName}</em>
                </div>
            </div>
        </div>

        <button on:click={createNewSolutionFolder}>Accept</button>
        <button on:click={closeMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
