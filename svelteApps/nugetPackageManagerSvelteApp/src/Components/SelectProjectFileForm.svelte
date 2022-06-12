<script lang="ts">
    import type { DotNetSolutionFile } from "../../../../out/FileSystem/Files/DotNetSolutionFile";
    import { MessageReadSolutionIntoTreeView } from "../../../../out/Messages/Read/MessageReadSolutionIntoTreeView";
    import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharpProjectFile";

	export let projectFiles: CSharpProjectFile[] = [];
	export let selectedProjectFile: CSharpProjectFile;
	
</script>

<div>
	<select bind:value={selectedProjectFile} class="dni_select">
		{#each projectFiles as projectFile}
			<option value="{projectFile}" class="dni_option">{projectFile.absoluteFilePath.filenameWithExtension}</option>
		{/each}
	</select>
</div>

<style>
	.dni_select {
		color: var(--vscode-input-foreground);
		background-color: var(--vscode-input-background);
	}
</style>