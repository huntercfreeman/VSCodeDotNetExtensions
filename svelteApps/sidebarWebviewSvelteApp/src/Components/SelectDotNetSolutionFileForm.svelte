<script lang="ts">
    import type { DotNetSolutionFile } from "../../../../out/FileSystem/Files/DotNetSolutionFile";
    import { MessageReadSolutionIntoTreeView } from "../../../../out/Messages/Read/MessageReadSolutionIntoTreeView";

	export let dotNetSolutionFiles: DotNetSolutionFile[] = [];

	let selectedDotNetSolutionFile: DotNetSolutionFile;
	
	function handleSelectOnChange() {
		if(selectedDotNetSolutionFile) {
            let messageReadSolutionIntoTreeView = new MessageReadSolutionIntoTreeView(selectedDotNetSolutionFile);

            tsVscode.postMessage({
                type: undefined,
                value: messageReadSolutionIntoTreeView
            });
        }
	}
</script>

<div>
	<select bind:value={selectedDotNetSolutionFile} on:change="{handleSelectOnChange}" class="dni_select">
		{#each dotNetSolutionFiles as solutionFile}
			<option value="{solutionFile}" class="dni_option">{solutionFile.absoluteFilePath.filenameWithExtension}</option>
		{/each}
	</select>
</div>

<style>
	.dni_select {
		color: var(--vscode-input-foreground);
		background-color: var(--vscode-input-background);
	}
</style>