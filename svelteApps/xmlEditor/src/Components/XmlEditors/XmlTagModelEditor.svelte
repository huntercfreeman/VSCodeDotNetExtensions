<script lang="ts">
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import XmlAttributeModelEditor from './XmlAttributeModelEditor.svelte';
    import XmlFileEditor from './XmlFileEditor.svelte';

	export let xmlTagModel: XmlTagModel;
</script>

<div class="dni_xml-tag-model-editor">
    <div class="dni_xml-tag-model-editor-tag-name">
        <input bind:value={xmlTagModel.tagName} />
    </div>

    <div class="dni_xml-tag-model-editor-attributes">
        {#each xmlTagModel.xmlAttributeModels as xmlAttributeModel}
            <XmlAttributeModelEditor xmlAttributeModel={xmlAttributeModel} />
        {/each}  
    </div>

    <div class="dni_xml-tag-model-editor-children">
        {#if xmlTagModel.children}
            <XmlFileEditor xmlFileModel={xmlTagModel.children} />
        {/if}
    </div>
</div>

