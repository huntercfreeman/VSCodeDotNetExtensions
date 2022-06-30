<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageUpdateRenameAny } from "../../../../../out/Messages/Update/MessageUpdateRenameAny";

    export let closeMenu;
    export let namespaceId: string;
    export let index: number;
	export let category;

    $: contextMenuTargetValue = $contextMenuTarget;

	$: isFocusedCssClass = isFocused
		? "dni_focused"
		: "";
		
    let isFocused = false;

	let toBeFilenameWithExtension: string | undefined;

    function beginFormRenameOnClick() {
		toBeFilenameWithExtension = contextMenuTargetValue.absoluteFilePath.filenameWithExtension;
	}

	function performRenameOnClick() {
		if (toBeFilenameWithExtension) {
			
			let messageUpdateRenameAny =
				new MessageUpdateRenameAny(
					contextMenuTargetValue,
					toBeFilenameWithExtension
				);

			tsVscode.postMessage({
				type: undefined,
				value: messageUpdateRenameAny,
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
			onClick={beginFormRenameOnClick}
			{closeMenu}
			text="Rename."
			{namespaceId}
			{index}
            {category}
			bind:isFocused={isFocused}
		/>
		<TextInputForm
			bind:value={toBeFilenameWithExtension}
			onValidSubmit={performRenameOnClick}
			placeholder="Rename {contextMenuTargetValue.absoluteFilePath.filenameWithExtension}"
		/>
	</div>
{/if}
