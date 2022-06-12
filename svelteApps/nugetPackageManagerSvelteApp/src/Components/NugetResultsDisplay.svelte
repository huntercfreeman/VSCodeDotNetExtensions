<script lang="ts">
    import type { NugetPackageModel } from "../../../../out/DotNet/NugetPackageModel";
import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharpProjectFile";
    import NugetPackageDisplay from "./NugetPackageDisplay.svelte";

	export let nugetPackageModels: NugetPackageModel[] = [];
	export let selectedProjectFile: CSharpProjectFile;
	
</script>

<div>
    {#each nugetPackageModels as nugetPackageModel (nugetPackageModel.id)}
        <NugetPackageDisplay nugetPackageModel={nugetPackageModel}
                             selectedProjectFile={selectedProjectFile} />
    {/each}
</div>