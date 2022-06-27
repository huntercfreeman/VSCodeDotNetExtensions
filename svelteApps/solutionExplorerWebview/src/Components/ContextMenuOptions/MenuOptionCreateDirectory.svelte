<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateDirectoryInAny } from "../../../../../out/Messages/Create/MessageCreateDirectoryInAny";
    import { DirectoryFile } from "../../../../../out/FileSystem/Files/DirectoryFile";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;
	export let category;
    
    let createDirectoryFilename: string | undefined;

	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
    
    let isFocused = false;

    function beginFormCreateDirectoryOnClick() {
        createDirectoryFilename = "";
    }

    function createDirectoryOnClick() {
        if (createDirectoryFilename) {
            if (contextMenuTargetValue.fileKind === FileKind.directory || 
                contextMenuTargetValue.projectModel) {
                    let messageCreateDirectoryInAny =
                        new MessageCreateDirectoryInAny(
                            createDirectoryFilename,
                            contextMenuTargetValue
                        );

                    tsVscode.postMessage({
                        type: undefined,
                        value: messageCreateDirectoryInAny,
                    });
                }

            closeMenu();
        }
    }

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <div class="dni_menu-option {isFocusedCssClass}">
        <MenuOption
            onClickStopPropagation={true}
            onClick={beginFormCreateDirectoryOnClick}
			{closeMenu}
            text="Create Directory."
            {idNamespace}
            {index}
            {category}
            bind:isFocused={isFocused}
        />
        <TextInputForm
            bind:value={createDirectoryFilename}
            onValidSubmit={createDirectoryOnClick}
            placeholder="Directory name"
        />
    </div>
{/if}
