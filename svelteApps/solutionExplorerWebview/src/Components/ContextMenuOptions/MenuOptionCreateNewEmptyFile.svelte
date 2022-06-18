<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateEmptyFileInAny } from "../../../../../out/Messages/Create/MessageCreateEmptyFileInAny";

	export let closeMenu;

	let contextMenuTargetValue;
	let addEmptyFileFilename: string | undefined;

	contextMenuTarget.subscribe((value) => {
		contextMenuTargetValue = value;
	});

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
</script>

{#if contextMenuTargetValue}
	<MenuOption
		onClickStopPropagation={true}
		onClick={beginFormAddEmptyFileOnClick}
		text="Create empty file."
	/>
	<TextInputForm
		bind:value={addEmptyFileFilename}
		onValidSubmit={addEmptyFileToFolderOnClick}
		placeholder="Filename with extension"
	/>
{/if}
