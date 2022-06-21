<script lang="ts">
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
import ExpansionChevron from '../ExpansionChevron.svelte';
    import XmlTagModelEditor from './XmlTagModelEditor.svelte';

	export let nugetPackageTags: XmlTagModel[] = [];
    let isExpanded: boolean = true;
</script>

<div class="dni_xml-tag-nuget-package-editor">
    <ExpansionChevron bind:isExpanded={isExpanded} />

    Nuget Packages:

    {#if isExpanded}
        <div class="dni_tree-view-children">
            {#each nugetPackageTags as nugetPackageTag}
                <div class="dni_xml-tag-nuget-package">
                    <XmlTagModelEditor xmlTagModel={nugetPackageTag}
                                    displayChildren={false} />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
	.dni_tree-view-children {
		margin-left: 2em;
		padding-left: 3px;
		border-left: 1px solid var(--vscode-tree-indentGuidesStroke);
        margin-top: 3px;
	}

    .dni_xml-tag-nuget-package {
        margin-bottom:3px;
    }
</style>