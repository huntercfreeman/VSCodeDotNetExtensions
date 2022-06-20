<script lang="ts">
	export let projectFiles: any[] = [];
	export let selectedProjectModel: any;
</script>

<div>
	<select bind:value={selectedProjectModel} class="dni_select">
		{#each projectFiles as projectFile}
			<option value={projectFile} class="dni_option"
				>{projectFile.absoluteFilePath.filenameWithExtension}</option
			>
		{/each}
	</select>
</div>

<style>
	.dni_select {
		color: var(--vscode-input-foreground);
		background-color: var(--vscode-input-background);
	}
</style>
