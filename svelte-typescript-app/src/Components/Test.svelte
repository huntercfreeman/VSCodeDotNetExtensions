<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";
	import type { SolutionModel } from "../../../out/DotNet/SolutionModel";
	import type { CSharpProjectModel } from "../../../out/DotNet/CSharpProjectModel";

	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";

	let solutionFilesInWorkspace: SolutionModel[] = [];
	let solutionFileContent: string = "";

	function getSolutionFilesInWorkspace() {
		tsVscode.postMessage(
			ConstantsMessages.ConstructLoadSolutionsInWorkspaceMessage(null)
		);
	}

	function readSolutionContents(solution: SolutionModel) {
		tsVscode.postMessage(
			ConstantsMessages.ConstructReadSolutionMessage(solution)
		);
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;
			switch (message.type) {
				case ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE:
					solutionFilesInWorkspace = message.value;
					break;
			}
			switch (message.type) {
				case ConstantsMessages.READ_SOLUTION:
					solutionFileContent = message.value;
					break;
			}
		});

		getSolutionFilesInWorkspace();
	});
</script>

<button on:click={getSolutionFilesInWorkspace}>
	Reload Solutions In Workspace
</button>

<div style="margin-bottom: 5px;">
	Selected Solution Contents:<hr />
<pre>
{solutionFileContent}
</pre>
</div>

{#each solutionFilesInWorkspace as solution}
	<div style="border: 2px solid aqua;">
		{solution.absoluteFilePath.fileNameWithExtension}

		<button on:click="{() => readSolutionContents(solution)}">Read {solution.absoluteFilePath.fileNameWithExtension} Contents</button>

		{#if (solution.projects?.length ?? 0) > 0}
			{#each solution.projects as project}
				{project.absoluteFilePath.fileNameWithExtension}
			{/each}
		{:else}
			<div>(solution.projects?.length ?? 0) > 0</div>
		{/if}
	</div>
{/each}

<style>
</style>
