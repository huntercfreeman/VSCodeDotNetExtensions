<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageUpdateRenameAny } from "../../../../../out/Messages/Update/MessageUpdateRenameAny";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;

    $: contextMenuTargetValue = $contextMenuTarget;

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
    <MenuOption
        onClickStopPropagation={true}
        onClick={beginFormRenameOnClick}
        text="Rename."
		{idNamespace}
		{index}
    />
    <TextInputForm
		bind:value={toBeFilenameWithExtension}
		onValidSubmit={performRenameOnClick}
		placeholder="Rename {contextMenuTargetValue.absoluteFilePath.filenameWithExtension}"
	/>
{/if}
