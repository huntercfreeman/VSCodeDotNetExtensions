<script lang="ts">
	export let projectFiles: any[] = [];
	export let selectedProjectFile: any;

	export let onChangeCallback: (projectFile: any) => any;
</script>

<div>
	<select bind:value={selectedProjectFile} on:change="{onChangeCallback}" class="dni_select">
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
