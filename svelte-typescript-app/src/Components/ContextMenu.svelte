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
	import { contextMenuTarget } from './menu.js';

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
	{#if contextMenuTargetValue.contextualInformation === 
	     ConstantsContextualInformation.TREE_VIEW_SOLUTION_CONTEXT}

		 <ContextMenuForSolutionTreeView {...pos} closeMenu={closeMenu} />
	{:else if contextMenuTargetValue.contextualInformation === 
		ConstantsContextualInformation.TREE_VIEW_SOLUTION_FOLDER_CONTEXT}
		
		<ContextMenuForSolutionFolderTreeView {...pos} closeMenu={closeMenu} />
	{:else if contextMenuTargetValue.contextualInformation === 
		ConstantsContextualInformation.TREE_VIEW_CSHARP_PROJECT_CONTEXT}
		
		<ContextMenuForCSharpProjectTreeView {...pos} closeMenu={closeMenu} />
	{:else if contextMenuTargetValue.contextualInformation === 
		ConstantsContextualInformation.TREE_VIEW_DIRECTORY_CONTEXT}
		
		<ContextMenuForDirectoryTreeView {...pos} closeMenu={closeMenu} />
	{:else if contextMenuTargetValue.contextualInformation === 
		ConstantsContextualInformation.TREE_VIEW_DEFAULT_FILE_CONTEXT}
		
		<ContextMenuForDefaultFileTreeView {...pos} closeMenu={closeMenu} />
	{/if}
{/if}

<svelte:body on:contextmenu|preventDefault={onRightClick} on:keydown={extendOnKeyDown} />