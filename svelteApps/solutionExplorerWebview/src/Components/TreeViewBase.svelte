<script lang="ts">
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import FileIconDisplay from "./FileIconDisplay.svelte";
	import { contextMenuTarget } from "./menu.js";
	import TreeViewMapper from "./TreeViewMapper.svelte";
	import { activeIdeFileWrap } from "./activeState"
	import { activeIdeFileHandleOnKeyDownWrap } from "./activeState"

	export let ideFile: IdeFile;
	export let children: IdeFile[] | undefined;
	export let titleText: string;
	export let titleOnClick: (e: MouseEvent) => void;
	export let getChildFiles: () => IdeFile[];
	export let hasDifferentParentContainer: (childIdeFile: IdeFile) => boolean;
	export let index: number;
	export let parent: IdeFile;
	
	let activeIdeFileWrapValue;

	activeIdeFileWrap.subscribe((value) => {
		activeIdeFileWrapValue = value;

		if (value && ((value as IdeFile).nonce === ideFile.nonce)) {
			activeIdeFileHandleOnKeyDownWrap.set(handleOnKeyDown);
		}
	});
	
	$: activeIdeFile = activeIdeFileWrapValue as IdeFile;

	$: isActiveCssClass = (activeIdeFile?.nonce ?? "") === ideFile.nonce
		? "dni_active"
		: "";

	let contextMenuTargetValue;

	contextMenuTarget.subscribe((value) => {
		contextMenuTargetValue = value;
	});

	$: isActiveContextMenuTarget = ((contextMenuTargetValue as IdeFile)?.nonce ?? "") === ideFile.nonce
		? "dni_active-context-menu-target"
		: "";

	function fireTitleOnDoubleClick(e: MouseEvent) {

		setActiveIdeFileAsSelf();

		titleOnClick(e);
	}
	
	function setActiveIdeFileAsSelf() {

		activeIdeFileWrap.set(ideFile);
		activeIdeFileHandleOnKeyDownWrap.set(handleOnKeyDown);
	}
	
	function setActiveIdeFileAsParent() {

		activeIdeFileWrap.set(parent);
	}

	function handleOnKeyDown(e: KeyboardEvent) {
		if (e.key === "ArrowLeft") {
			if (ideFile.isExpanded) {
				ideFile.isExpanded = false;
			}
			else if (parent) {
				setActiveIdeFileAsParent();
			}
		}
		else if (e.key === "ArrowRight") {
			if (!ideFile.isExpanded) {
				ideFile.isExpanded = true;
			}
			else if ((children?.length ?? 0) > 0) {
				activeIdeFileWrap.set(children[0]);
			}
		}
	}
</script>

<div class="dni_tree-view">
	<div
		class="dni_tree-view-title dni_unselectable {isActiveCssClass} {isActiveContextMenuTarget}"
		title={titleText}
		on:dblclick={(e) => fireTitleOnDoubleClick(e)}
		on:click={(e) => setActiveIdeFileAsSelf()}
		on:contextmenu={(e) => contextMenuTarget.set(ideFile)}
	>
		{#if ideFile.hideExpansionChevronWhenNoChildFiles && ((children ?? getChildFiles())?.length ?? 0) === 0}
			<span
				style="visibility: hidden;"
				tabindex="-1"
				class="dni_do-not-show-chevron"
			>
				<ExpansionChevron isExpanded={false}
				                  onClickAction={setActiveIdeFileAsSelf} />
			</span>
		{:else}
			<span class="dni_tree-view-title-expansion-chevron">
				<ExpansionChevron bind:isExpanded={ideFile.isExpanded}
				                  onClickAction={setActiveIdeFileAsSelf} />
			</span>
		{/if}

		<span class="dni_tree-view-title-text">
			<FileIconDisplay ideFile={ideFile} />

			{index + "_" + titleText}
		</span>
	</div>

	<div class="dni_tree-view-children">
		{#if ideFile.isExpanded}
			{#each children ?? getChildFiles() ?? [] as child, i (child.nonce)}
				{#if !hasDifferentParentContainer(child)}
					<TreeViewMapper ideFile={child} index={i} parent={ideFile} />
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	.dni_tree-view-children {
		margin-left: 10px;
		padding-left: 3px;
		border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
	}

	.dni_tree-view-title {
		width: 100%;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
	}

	.dni_tree-view-title:hover {
		background-color: var(--vscode-editorHoverWidget-background);
		color: var(--vscode-editorHoverWidget-foreground);
		cursor: pointer;
	}

	.dni_tree-view-title-text {
		margin-left: 2px;
		border: 1px solid transparent;
	}

	.dni_tree-view-title.dni_active {
		background-color: var(--vscode-list-activeSelectionBackground);
		border: 1px solid var(--vscode-focusBorder);
		color: var(--vscode-list-activeSelectionIconForeground);
	}

	.dni_tree-view-title.dni_active-context-menu-target {
		border: 1px solid var(--vscode-focusBorder);
	}
	
	/* ....when extensionactive.... .dni_tree-view-title.dni_active {
		background-color: var(--vscode-list-inactiveSelectionBackground);
	} */
</style>
