<script lang="ts">
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import ExpansionChevron from '../ExpansionChevron.svelte';
    import XmlTagModelEditor from './XmlTagModelEditor.svelte';

	export let projectReferenceTags: XmlTagModel[] = [];

    let isExpanded: boolean = true;
</script>

<div class="dni_xml-tag-project-reference-editor">
    <ExpansionChevron bind:isExpanded={isExpanded} />

    Project References:

    {#if isExpanded}
        <div class="dni_tree-view-children">
            {#each projectReferenceTags as projectReferenceTag}
                <div class="dni_xml-tag-project-reference">
                    <XmlTagModelEditor xmlTagModel={projectReferenceTag}
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

    .dni_xml-tag-project-reference {
        margin-bottom:3px;
    }
</style>