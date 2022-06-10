<script lang="ts">
    import Menu from './Menu.svelte'
    import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
    import { ConstantsContextualInformation } from "../../../out/Constants/ConstantsContextualInformation";
	import { contextMenuTarget } from './menu.js';
	import MenuOptionCreateNewTemplatedFile from './ContextMenuOptions/MenuOptionCreateNewTemplatedFile.svelte';
	import MenuOptionCreateNewEmptyFile from './ContextMenuOptions/MenuOptionCreateNewEmptyFile.svelte';
	import MenuOptionRefreshChildFiles from './ContextMenuOptions/MenuOptionRefreshChildFiles.svelte';
	import MenuOptionCreateDirectory from './ContextMenuOptions/MenuOptionCreateDirectory.svelte';
	import { ContextualInformationDatumKind } from '../../../out/ContextMenus/ContextualInformationDatumKind';
	import MenuOptionGroup from './ContextMenuOptions/MenuOptionGroup.svelte';
	import type { ContextualInformationDatum } from '../../../out/ContextMenus/ContextualInformationDatum';

    let pos = { x: 0, y: 0 };
    let showMenu = false;

	let contextMenuTargetValue;

	let contextMenuCategories;
	
	contextMenuTarget.subscribe(value => {
		contextMenuTargetValue = value;
	});

    export async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise(res => setTimeout(res, 100));
		}
		
		pos = { x: e.pageX, y: e.pageY };
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

	function getContextMenuCategories(): string[] {
		let categories: string[] = [];

		categories.push(ContextualInformationDatumKind.create);
		categories.push(ContextualInformationDatumKind.read);
		categories.push(ContextualInformationDatumKind.update);
		categories.push(ContextualInformationDatumKind.delete);

		return categories;
	}

	function getCategoryContextualInformationDatums(
		contextualInformation: ContextualInformationDatum[], category: string)
		: ContextualInformationDatum[] {

			return contextualInformation
				.filter(ci => ci.contextualInformationDatumKind === category);
	}
</script>

{#if showMenu}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		{#if (contextMenuTargetValue.contextualInformation?.length ?? 0) === 0}
			<MenuOption text="No Context Menu Options for this item." />
		{:else}
			{#each (contextMenuCategories = getContextMenuCategories()) as category, i}
				<MenuOptionGroup contextualInformation="{getCategoryContextualInformationDatums(contextMenuTargetValue.contextualInformation, category)}" 
				                 closeMenu="{closeMenu}" />

				{#if i !== contextMenuCategories.length - 1 && (getCategoryContextualInformationDatums(contextMenuTargetValue.contextualInformation, contextMenuCategories[i + 1]).length > 0)}
					<MenuDivider />
				{/if}
			{/each}
		{/if}
	</Menu>
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} on:keydown={extendOnKeyDown} />