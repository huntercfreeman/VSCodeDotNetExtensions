<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import TextInputForm from "../TextInputForm.svelte";
    import { MessageUpdateRenameAny } from "../../../../../out/Messages/Update/MessageUpdateRenameAny";

    export let closeMenu;

    let contextMenuTargetValue;
	let toBeFilenameWithExtension: string | undefined;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

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
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={beginFormRenameOnClick}
        text="Rename."
    />
    <TextInputForm
		bind:value={toBeFilenameWithExtension}
		onValidSubmit={performRenameOnClick}
		placeholder="Rename {contextMenuTargetValue.absoluteFilePath.filenameWithExtension}"
	/>
{/if}
