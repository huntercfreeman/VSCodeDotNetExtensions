<script lang="ts">
    import type { NugetPackageModel } from "../../../../out/DotNet/NugetPackageModel";
    import type { NugetPackageVersionModel } from "../../../../out/DotNet/NugetPackageVersionModel";
    import type { CSharpProjectFile } from "../../../../out/FileSystem/Files/CSharpProjectFile";
    import ExpansionChevron from "./ExpansionChevron.svelte";
    import SelectNugetPackageVersionForm from "./SelectNugetPackageVersionForm.svelte";
	import { MessageUpdateAddNugetPackageReference } from "../../../../out/Messages/Update/MessageUpdateAddNugetPackageReference";

	export let nugetPackageModel: NugetPackageModel;
	export let selectedProjectFile: CSharpProjectFile;

	let selectedVersionModel: NugetPackageVersionModel;

    let nugetPackageIsExpanded = false;
    let metaDataIsExpanded = false;
    let descriptionIsExpanded = false;
    let summaryIsExpanded = false;
	
    function addNugetPackageReference() {
		let messageUpdateAddNugetPackageReference = new MessageUpdateAddNugetPackageReference(selectedProjectFile,
            nugetPackageModel,
            selectedVersionModel);

		tsVscode.postMessage({
			type: undefined,
			value: messageUpdateAddNugetPackageReference
		});
	}

</script>

<div>
    <div>
        <ExpansionChevron bind:isExpanded={nugetPackageIsExpanded} />

        <span>{nugetPackageModel.title} ({nugetPackageModel.totalDownloads.toLocaleString()}: downloads)</span>
    </div>
    {#if nugetPackageIsExpanded}
        <div class="dni_tree-view-children">
            <div><SelectNugetPackageVersionForm bind:selectedVersionModel={selectedVersionModel} 
                                                versionModels={nugetPackageModel.versions} /></div>
            <div>
                Chosen Version: {selectedVersionModel?.version ?? "undefined"}&nbsp;
                {#if selectedVersionModel}
                    ({selectedVersionModel.downloads.toLocaleString()}: downloads)
                {/if}
            </div>

            <button on:click={addNugetPackageReference}>
                Add to {selectedProjectFile.absoluteFilePath.filenameWithExtension}
            </button>

            <div><ExpansionChevron bind:isExpanded={descriptionIsExpanded} />
                <span>description:</span> 
                
                {#if descriptionIsExpanded}
                    <div class="dni_tree-view-children">
                        {nugetPackageModel.description}
                    </div>
                {/if}
            </div>
            
            <div><ExpansionChevron bind:isExpanded={summaryIsExpanded} />
                <span>summary:</span> 
                
                {#if summaryIsExpanded}
                    <div class="dni_tree-view-children">
                        {nugetPackageModel.summary}
                    </div>
                {/if}
            </div>
            
            <ExpansionChevron bind:isExpanded={metaDataIsExpanded} />
            <span>Meta Data:</span>
            
            {#if metaDataIsExpanded}
                <div class="dni_tree-view-children">
                    <div>type: {nugetPackageModel.type}</div>
                    <div>registration: {nugetPackageModel.registration}</div>
                    <div>id: {nugetPackageModel.id}</div>
                    <div>iconUrl: {nugetPackageModel.iconUrl}</div>
                    <div>licenseUrl: {nugetPackageModel.licenseUrl}</div>
                    <div>projectUrl: {nugetPackageModel.projectUrl}</div>
                    <div>tags: {nugetPackageModel.tags}</div>
                    <div>authors: {nugetPackageModel.authors}</div>
                    <div>owners : {nugetPackageModel.owners }</div>
                    <div>totalDownloads: {nugetPackageModel.totalDownloads}</div>
                    <div>verified: {nugetPackageModel.verified}</div>
                    <div>packageTypes: {nugetPackageModel.packageTypes}</div>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .dni_tree-view-children {
		margin-left: 10px;
		padding-left: 3px;
    	border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
	}
</style>