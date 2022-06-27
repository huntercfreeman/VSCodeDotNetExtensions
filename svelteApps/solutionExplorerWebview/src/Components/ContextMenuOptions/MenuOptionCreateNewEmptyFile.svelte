<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateEmptyFileInAny } from "../../../../../out/Messages/Create/MessageCreateEmptyFileInAny";

	export let closeMenu;
    export let idNamespace: string;
    export let index: number;
	
	$: contextMenuTargetValue = $contextMenuTarget;

	$: isFocusedCssClass = isFocused
		? "dni_focused"
		: "";
		
    let isFocused = false;

	let addEmptyFileFilename: string | undefined;

	function beginFormAddEmptyFileOnClick() {
		addEmptyFileFilename = "";
	}

	function addEmptyFileToFolderOnClick() {
		if (addEmptyFileFilename) {
			
			let messageCreateEmptyFileInAny =
				new MessageCreateEmptyFileInAny(
					addEmptyFileFilename,
					contextMenuTargetValue
				);

			tsVscode.postMessage({
				type: undefined,
				value: messageCreateEmptyFileInAny,
			});
			
			closeMenu();
		}
	}

	function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
	<MenuOption
		onClickStopPropagation={true}
		onClick={beginFormAddEmptyFileOnClick}
		text="Create empty file."
        {idNamespace}
        {index}
		bind:isFocused={isFocused}
	/>
	<TextInputForm
		bind:value={addEmptyFileFilename}
		onValidSubmit={addEmptyFileToFolderOnClick}
		placeholder="Filename with extension"
	/>
{/if}
