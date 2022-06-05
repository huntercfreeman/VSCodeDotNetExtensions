<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../../out/DotNet/CSharpProjectModel";

	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";
	import ExpansionChevron from "./ExpansionChevron.svelte";

	export let data: any;
	export let children: any[];

	let selectedSolution: SolutionModel;
	let isExpanded: boolean = false;
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
			
				<svelte:self data={child}
					   children={[]} />
			{/each}
		{/if}
	</div>
</div>