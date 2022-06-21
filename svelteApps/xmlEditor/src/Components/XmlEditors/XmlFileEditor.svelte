<script lang="ts">
    import type { XmlFileModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import XmlTagModelEditor from './XmlTagModelEditor.svelte';

	export let xmlFileModel: XmlFileModel;
</script>

<div class="dni_xml-file-model-editor" style="margin-left: 12px;">

    {#each xmlFileModel.xmlTagModels as xmlTagModel}
        {#if xmlTagModel.tagName}
            <div>
                <XmlTagModelEditor xmlTagModel={xmlTagModel} />
            </div>
        {/if}
    {/each}
</div>