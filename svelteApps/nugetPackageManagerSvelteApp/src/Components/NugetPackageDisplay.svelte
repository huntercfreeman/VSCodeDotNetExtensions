<script lang="ts">
    import type { NugetPackageModel } from "../../../../out/DotNet/NugetPackageModel";

	export let nugetPackageModel: NugetPackageModel;
	
</script>

<div>
<pre>
{JSON.stringify(nugetPackageModel, null, 2)}
</pre>
</div>

<style>
	.dni_select {
		color: var(--vscode-input-foreground);
		background-color: var(--vscode-input-background);
	}
</style>