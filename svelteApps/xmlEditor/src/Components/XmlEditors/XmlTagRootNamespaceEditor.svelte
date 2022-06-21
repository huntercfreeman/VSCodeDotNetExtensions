<script lang="ts">
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import ExpansionChevron from '../ExpansionChevron.svelte';
    import XmlTagModelEditor from './XmlTagModelEditor.svelte';

	export let rootNamespaceTag: XmlTagModel[] = [];

    let isExpanded: boolean = true;
</script>

<div class="dni_xml-tag-root-namespace-editor">
    <ExpansionChevron bind:isExpanded={isExpanded} />

    Root Namespace:

    {#if isExpanded}
        <div class="dni_tree-view-children">
            {#each rootNamespaceTag as tag}
                <div class="dni_xml-tag-root-namespace">
                    <XmlTagModelEditor xmlTagModel={tag} />
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

    .dni_xml-tag-root-namespace {
        margin-bottom:3px;
    }
</style>