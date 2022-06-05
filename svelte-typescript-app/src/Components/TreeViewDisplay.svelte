<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../../out/DotNet/CSharpProjectModel";
	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";
	import { ConstantsTreeView } from "../../../out/Constants/ConstantsTreeView";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import { json } from "stream/consumers";

	export let data: any;
	export let children: any[];
	
	let isExpanded: boolean = false;

	function hasDifferentParentContainer(child: any): boolean {
		if(child.solutionFolderParentSecondGuid) {
			if(child.solutionFolderParentSecondGuid !==
				data.secondGuid) {
					return true;
			}

			return false;
		}
	}
	
	function getChildrenOfChild(child: any): any[] {
		if(child.solutionFolderEntries) {
			return child.solutionFolderEntries;
		}
	}

	function getTitleText() {
		if (data.absoluteFilePath) {
			return data.absoluteFilePath.fileNameWithExtension;
		}
		else {
			
			return ConstantsTreeView.UNDEFINED_ABSOLUTE_FILE_PATH;
		}
	}
</script>

<div class="dni_tree-view">
	<div class="dni_tree-view-title" title="{getTitleText()}">
		<span class="dni_tree-view-title-expansion-chevron">
			<ExpansionChevron bind:isExpanded={isExpanded} />
		</span>

		<span class="dni_tree-view-title-text">
			{getTitleText()}
		</span>
	</div>
	
	<div class="dni_tree-view-children">
		{#if isExpanded}
			{#each children as child}
				{#if !hasDifferentParentContainer(child)}
					<svelte:self data={child}
						children={getChildrenOfChild(child)} />
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
		white-space: nowrap;
		display: inline-flex;
    	align-items: center;
	}

	.dni_tree-view-title-text {
		margin-left: 2px;
	}

	.dni_tree-view-title-expansion-chevron:hover {
		color: var(--vscode-button-foreground);
		background-color: var(--vscode-button-hoverBackground);
	}
</style>