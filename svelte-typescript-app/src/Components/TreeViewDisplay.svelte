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
	export let selectedSolution: SolutionModel;

	let isExpanded: boolean = false;

	function getPossibleSolutionFolderChildren(): any[] {
		let temporaryChildArray: any[] = [];

		for (const [key, value] of Object.entries(selectedSolution.solutionFolderMap)) {
			if (value === data.guidTwo) {
				temporaryChildArray.push(selectedSolution.projects.find(x => x.guidTwo === key));
			}
		}

		return temporaryChildArray;
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
				{#if !selectedSolution.solutionFolderMap.has(data?.guidTwo ?? "")}
					<svelte:self data={child}
						children={getPossibleSolutionFolderChildren()}
						selectedSolution={selectedSolution} />
				{/if}
			{/each}
		{/if}
	</div>
</div>