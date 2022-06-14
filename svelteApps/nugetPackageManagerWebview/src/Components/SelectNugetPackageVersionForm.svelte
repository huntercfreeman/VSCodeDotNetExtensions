<script lang="ts">
	import type { NugetPackageVersionModel } from "../../../../out/DotNet/NugetPackageVersionModel";

	export let versionModels: NugetPackageVersionModel[] = [];
	export let selectedVersionModel: NugetPackageVersionModel;
</script>

<div>
	<select bind:value={selectedVersionModel} class="dni_select">
		{#each versionModels as versionModel}
			<option value={versionModel} class="dni_option"
				>{versionModel.version}</option
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
