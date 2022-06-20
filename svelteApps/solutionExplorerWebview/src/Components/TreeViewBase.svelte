<script lang="ts">
	import type { IdeFile } from "../../../../out/FileSystem/Files/IdeFile";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import FileIconDisplay from "./FileIconDisplay.svelte";
	import { contextMenuTarget } from "./menu.js";
	import TreeViewMapper from "./TreeViewMapper.svelte";

	export let ideFile: IdeFile;
	export let children: IdeFile[] | undefined;
	export let getTitleText: () => string;
	export let titleOnClick: (e: MouseEvent) => void;
	export let getChildFiles: () => IdeFile[];
	export let hasDifferentParentContainer: (childIdeFile: IdeFile) => boolean;
</script>

<div class="dni_tree-view">
	<div
		class="dni_tree-view-title"
		title={getTitleText()}
		on:click={(e) => titleOnClick(e)}
		on:contextmenu={(e) => contextMenuTarget.set(ideFile)}
	>
		{#if ideFile.hideExpansionChevronWhenNoChildFiles && ((children ?? getChildFiles())?.length ?? 0) === 0}
			<span
				style="visibility: hidden;"
				tabindex="-1"
				class="dni_unselectable"
			>
				<ExpansionChevron isExpanded={false} />
			</span>
		{:else}
			<span class="dni_tree-view-title-expansion-chevron">
				<ExpansionChevron bind:isExpanded={ideFile.isExpanded} />
			</span>
		{/if}

		<span class="dni_tree-view-title-text">
			<FileIconDisplay ideFile={ideFile} />

			{getTitleText()}
		</span>
	</div>

	<div class="dni_tree-view-children">
		{#if ideFile.isExpanded}
			{#each children ?? getChildFiles() as child (child.nonce)}
				{#if !hasDifferentParentContainer(child)}
					<TreeViewMapper ideFile={child} />
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
	}
</style>
