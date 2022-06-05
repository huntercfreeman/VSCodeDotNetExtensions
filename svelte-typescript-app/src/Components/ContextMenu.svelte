<script lang="ts">
    import Menu from './Menu.svelte'
    import MenuOption from './MenuOption.svelte';
	import MenuDivider from './MenuDivider.svelte';
	import ContextMenuForSolutionTreeView from './ContextMenus/ContextMenuForSolutionTreeView.svelte';
	import ContextMenuForSolutionFolderTreeView from './ContextMenus/ContextMenuForSolutionFolderTreeView.svelte';
	import ContextMenuForCSharpProjectTreeView from './ContextMenus/ContextMenuForCSharpProjectTreeView.svelte';
    import { ConstantsContextualInformation } from "../../../out/Constants/ConstantsContextualInformation";

	export let contextualInformation: string;

    let pos = { x: 0, y: 0 };
    let showMenu = false;

    async function onRightClick(e) {
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
</script>

{#if showMenu}

	{#if contextualInformation === ConstantsContextualInformation.TREE_VIEW_SOLUTION_CONTEXT}
		<ContextMenuForSolutionTreeView x={pos.x} y={pos.y} closeMenu={closeMenu} />
	{:else if contextualInformation === ConstantsContextualInformation.TREE_VIEW_SOLUTION_FOLDER_CONTEXT}
		<ContextMenuForSolutionFolderTreeView x={pos.x} y={pos.y} closeMenu={closeMenu} />
	{:else if contextualInformation === ConstantsContextualInformation.TREE_VIEW_CSHARP_PROJECT_CONTEXT}
		<ContextMenuForCSharpProjectTreeView x={pos.x} y={pos.y} closeMenu={closeMenu} />
	{/if}
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} />