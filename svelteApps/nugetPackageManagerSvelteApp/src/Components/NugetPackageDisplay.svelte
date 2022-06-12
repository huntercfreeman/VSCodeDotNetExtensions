<script lang="ts">
    import type { NugetPackageModel } from "../../../../out/DotNet/NugetPackageModel";
import ExpansionChevron from "./ExpansionChevron.svelte";

	export let nugetPackageModel: NugetPackageModel;

    let nugetPackageIsExpanded = false;
    let metaDataIsExpanded = false;
    let descriptionIsExpanded = false;
    let summaryIsExpanded = false;
	
</script>

<div>
    <div on:click={() => nugetPackageIsExpanded = !nugetPackageIsExpanded}>
        <ExpansionChevron bind:isExpanded={nugetPackageIsExpanded} />

        <span>{nugetPackageModel.title} ({nugetPackageModel.totalDownloads.toLocaleString()}: downloads)</span>
    </div>
    {#if nugetPackageIsExpanded}
        <div class="dni_tree-view-children">
            <div>Latest version: {nugetPackageModel.version}</div>

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
	.dni_select {
		color: var(--vscode-input-foreground);
		background-color: var(--vscode-input-background);
	}

    .dni_tree-view-children {
		margin-left: 10px;
		padding-left: 3px;
    	border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
	}
</style>