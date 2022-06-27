<script lang="ts">
	import Menu from "./Menu.svelte";
	import MenuOption from "./MenuOption.svelte";
	import MenuDivider from "./MenuDivider.svelte";
	import MenuOptionMapper from "./MenuOptionMapper.svelte";
	import { contextMenuTarget } from "./menu.js";
	import { activeIdeFileWrap } from "./activeState.js";
	import { ContextualInformationDatumKind } from "../../../../out/ContextMenus/ContextualInformationDatumKind";
	import type { ContextualInformationDatum } from "../../../../out/ContextMenus/ContextualInformationDatum";

	$: activeIdeFileWrapValue = $activeIdeFileWrap?.ideFile;

	window.addEventListener('contextmenu', e => {

		// e.button === 2 means was right click
		// Mac has bug with ctrl + right click -> e.button === 1
		if (e.button !== 2 && e.button !== 1) {
			// This means was keyboard contextmenu button NOT from mouse
			contextMenuTarget.set(activeIdeFileWrapValue);
		}
		
		onRightClick(e);
		e.stopImmediatePropagation()

	}, true);

	let pos = { x: 0, y: 0 };
	let showMenu = false;

	let contextMenuCategories;

	$: contextMenuTargetValue = $contextMenuTarget;

	export async function onRightClick(e) {
		if (showMenu) {
			showMenu = false;
			await new Promise((res) => setTimeout(res, 100));
		}

		pos = { x: e.pageX, y: e.pageY };
		showMenu = true;
	}

	function closeMenu() {
		showMenu = false;

		contextMenuTarget.set(undefined);
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
		categories.push(ContextualInformationDatumKind.control);
		categories.push(ContextualInformationDatumKind.execute);
		categories.push(ContextualInformationDatumKind.update);
		categories.push(ContextualInformationDatumKind.delete);

		return categories;
	}

	function getCategoryContextualInformationDatums(
		contextualInformation: ContextualInformationDatum[],
		category: string
	): ContextualInformationDatum[] {
		return contextualInformation.filter(
			(ci) => ci.contextualInformationDatumKind === category
		);
	}
</script>

{#if showMenu && contextMenuTargetValue}
	<Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
		{#if (contextMenuTargetValue.contextualInformation?.length ?? 0) === 0}
			<MenuOption text="No Context Menu Options for this item."
			            idNamespace="context-menu"
						index={0} />
		{:else}
			{#each (contextMenuCategories = getContextMenuCategories()) as category, i}
				<MenuOptionMapper
					contextualInformation={getCategoryContextualInformationDatums(
						contextMenuTargetValue.contextualInformation,
						category
					)}
					{closeMenu}
					idNamespace="context-menu"
					index={i}
				/>

				{#if i !== contextMenuCategories.length - 1 && getCategoryContextualInformationDatums(contextMenuTargetValue.contextualInformation, contextMenuCategories[i + 1]).length > 0}
					<MenuDivider />
				{/if}
			{/each}
		{/if}
	</Menu>
{/if}

<svelte:body
	on:contextmenu|preventDefault={onRightClick}
	on:keydown={extendOnKeyDown} />
