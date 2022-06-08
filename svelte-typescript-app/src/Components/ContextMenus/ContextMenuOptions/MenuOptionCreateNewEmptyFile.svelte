<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
	import { contextMenuTarget } from '../../menu';
    import MenuOption from '../../MenuOption.svelte';
    import TextInputForm from '../../TextInputForm.svelte';

	export let closeMenu;

	let contextMenuTargetValue;
	let addEmptyFileFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

	function beginFormAddEmptyFileOnClick() {
		addEmptyFileFilename = "";
	}

	function addEmptyFileToFolderOnClick() {
		if(addEmptyFileFilename) {
			closeMenu();
		}
	}
</script>

<MenuOption onClickStopPropagation="{true}"
    onClick={beginFormAddEmptyFileOnClick} 
    text="Add an empty file." />
<TextInputForm bind:value="{addEmptyFileFilename}"
                onValidSubmit="{addEmptyFileToFolderOnClick}"
                placeholder="Filename with extension" />
{#if addEmptyFileFilename && addEmptyFileFilename.endsWith(ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION)}
    Add a code behind? 
    
    <input style="display: inline;" 
            type="checkbox"
            bind:checked="{shouldAddCodeBehind}" />
{/if}