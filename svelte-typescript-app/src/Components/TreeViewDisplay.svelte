<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../../out/DotNet/CSharpProjectModel";
	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";
	import ExpansionChevron from "./ExpansionChevron.svelte";
	import { json } from "stream/consumers";

	export let data: any;
	export let children: any[];

	let isExpanded: boolean = false;

	function hasDifferentParentContainer(child: any): boolean {
		if(child.containedInSolutionFolder) {
			return true;
		}
	}
	
	function getChildrenOfChild(child: any): any[] {
		if(child.solutionFolderEntries) {
			return child.solutionFolderEntries;
		}
	}
</script>



<div class="dni_tree-view">
	<div class="dni_tree-view-title">
		<ExpansionChevron bind:isExpanded={isExpanded} />
		
		{#if data.absoluteFilePath}
			{data.absoluteFilePath.fileNameWithExtension}
		{:else}
			Could not find absoluteFilePath
		{/if}
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
    	border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
	}
</style>