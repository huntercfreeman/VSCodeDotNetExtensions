<script lang="ts">
    import Menu from './Menu.svelte'
    import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
	import ContextMenuForSolutionTreeView from './ContextMenus/ContextMenuForSolutionTreeView.svelte';
	import ContextMenuForSolutionFolderTreeView from './ContextMenus/ContextMenuForSolutionFolderTreeView.svelte';
	import ContextMenuForCSharpProjectTreeView from './ContextMenus/ContextMenuForCSharpProjectTreeView.svelte';
	import ContextMenuForDirectoryTreeView from './ContextMenus/ContextMenuForDirectoryTreeView.svelte';
	import ContextMenuForDefaultFileTreeView from './ContextMenus/ContextMenuForDefaultFileTreeView.svelte';
    import { ConstantsContextualInformation } from "../../../out/Constants/ConstantsContextualInformation";
    import { ContextualInformationDatum } from "../../../out/ContextMenus/ContextualInformationDatum";
	import { contextMenuTarget } from './menu.js';
import MenuOptionCreateNewTemplatedFile from './ContextMenus/ContextMenuOptions/MenuOptionCreateNewTemplatedFile.svelte';
import MenuOptionCreateNewEmptyFile from './ContextMenus/ContextMenuOptions/MenuOptionCreateNewEmptyFile.svelte';

    let pos = { x: 0, y: 0 };
    let showMenu = false;

	let contextMenuTargetValue;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    export async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	}
	
	function closeMenu() {
		showMenu = false;
	}

	function extendOnKeyDown(keyboardEvent) {
        if (keyboardEvent.code === "Escape" && showMenu) {
            closeMenu();
        }
    }
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		{#if (contextMenuTargetValue.contextualInformation?.length ?? 0) === 0}
			<MenuOption text="No Context Menu Options for this item." />
		{:else}
			{#each contextMenuTargetValue.contextualInformation as contextualInformationDatum}
				{#if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewTemplatedFile,
																	contextualInformationDatum)}
					<MenuOptionCreateNewTemplatedFile />
				{:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewEmptyFile,
																		contextualInformationDatum)}
					<MenuOptionCreateNewEmptyFile />
				{/if}
			{/each}
		{/if}
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} on:keydown={extendOnKeyDown} />