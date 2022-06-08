<script lang="ts">
    import { ConstantsFileExtensionsNoPeriod } from '../../../../../out/Constants/ConstantsFileExtensionsNoPeriod';
    import { contextMenuTarget } from '../../menu';
    import MenuOption from '../../MenuOption.svelte';
    import TextInputForm from '../../TextInputForm.svelte';

	export let closeMenu;

	let contextMenuTargetValue;
    let addFileWithTemplateFilename: string | undefined;
	let shouldAddCodeBehind: boolean = false;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

	function beginFormAddFileWithTemplateNameOnClick() {
		addFileWithTemplateFilename = "";
	}	

	function addFileWithTemplateToFolderOnClick() {
		if(addFileWithTemplateFilename) {
			closeMenu();
		}
	}
</script>

<MenuOption onClickStopPropagation="{true}"
    onClick={beginFormAddFileWithTemplateNameOnClick} 
    text="Add file with template." />
<TextInputForm bind:value="{addFileWithTemplateFilename}"
                onValidSubmit="{addFileWithTemplateToFolderOnClick}"
                placeholder="Filename with extension" />
{#if addFileWithTemplateFilename && addFileWithTemplateFilename.endsWith(ConstantsFileExtensionsNoPeriod.RAZOR_FILE_EXTENSION)}
    Add a code behind? 
    
    <input style="display: inline;" 
            type="checkbox"
            bind:checked="{shouldAddCodeBehind}" />

            shouldAddCodeBehind: {shouldAddCodeBehind}
{/if}