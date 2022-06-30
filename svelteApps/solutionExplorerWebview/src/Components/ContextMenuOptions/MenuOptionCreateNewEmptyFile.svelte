<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageCreateEmptyFileInAny } from "../../../../../out/Messages/Create/MessageCreateEmptyFileInAny";

	export let closeMenu;
    export let namespaceId: string;
    export let index: number;
	export let category;
	
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
	<div class="dni_menu-option {isFocusedCssClass}">
		<MenuOption
			onClickStopPropagation={true}
			onClick={beginFormAddEmptyFileOnClick}
			{closeMenu}
			text="Create empty file."
			{namespaceId}
			{index}
            {category}
			bind:isFocused={isFocused}
		/>
		<TextInputForm
			bind:value={addEmptyFileFilename}
			onValidSubmit={addEmptyFileToFolderOnClick}
			placeholder="Filename with extension"
		/>
	</div>
{/if}
