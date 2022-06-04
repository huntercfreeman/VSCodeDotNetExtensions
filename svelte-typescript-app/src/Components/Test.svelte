<script lang="ts">
	import { onMount } from "svelte";
	import type { AbsoluteFilePath } from "../../../out/FileSystem/AbsoluteFilePath";

	import { ConstantsMessages } from "../../../out/Constants/ConstantsMessages";

	let solutionFilesInWorkspace: AbsoluteFilePath[] = [];

	function getSolutionFilesInWorkspace() {
		tsVscode.postMessage(
			ConstantsMessages.ConstructLoadSolutionsInWorkspaceMessage(null)
		);
	}

	onMount(async () => {
		window.addEventListener("message", async (event) => {
			const message = event.data;
			switch (message.type) {
				case ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE:
					solutionFilesInWorkspace = message.value;
			}
		});

		getSolutionFilesInWorkspace();
	});
</script>

<button on:click={getSolutionFilesInWorkspace}>
	Reload Solutions In Workspace
</button>

{#each solutionFilesInWorkspace as solution}
	<div>{solution.initialAbsoluteFilePathStringInput}</div>
{/each}

<style>
</style>
