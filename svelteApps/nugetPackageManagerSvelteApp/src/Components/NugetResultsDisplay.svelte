<script lang="ts">
    import type { NugetPackageModel } from "../../../../out/DotNet/NugetPackageModel";
    import NugetPackageDisplay from "./NugetPackageDisplay.svelte";

	export let nugetPackageModels: NugetPackageModel[] = [];
	
</script>

<div>
    {#each nugetPackageModels as nugetPackageModel (nugetPackageModel.id)}
        <NugetPackageDisplay nugetPackageModel={nugetPackageModel} />
    {/each}
</div>