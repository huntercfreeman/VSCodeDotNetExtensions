<script lang="ts">
    import type { NugetPackageModel } from "../../../../out/DotNet/NugetPackageModel";
    import NugetPackageDisplay from "./NugetPackageDisplay.svelte";

    export let nugetPackageModels: NugetPackageModel[] = [];
    export let selectedProjectFile: any;
</script>

<div>
    {#each nugetPackageModels as nugetPackageModel (nugetPackageModel.id)}
        <NugetPackageDisplay {nugetPackageModel} {selectedProjectFile} />
    {/each}
</div>
