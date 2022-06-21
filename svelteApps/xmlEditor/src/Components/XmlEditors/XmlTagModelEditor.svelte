<script lang="ts">
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import XmlAttributeModelEditor from './XmlAttributeModelEditor.svelte';
    import XmlFileEditor from './XmlFileEditor.svelte';
    import XmlInputField from './XmlInputField.svelte';

	export let xmlTagModel: XmlTagModel;
</script>

<div class="dni_xml-tag-model-editor">
    <span class="dni_xml-tag-model-editor-tag-name">
        <span>&lt;</span><!--
        --><XmlInputField bind:value={xmlTagModel.tagName} />
        
        {#if (xmlTagModel.xmlAttributeModels?.length ?? 0) === 0}
            <span>&gt;</span>
        {/if}
    </span>

    <span class="dni_xml-tag-model-editor-attributes">
        {#each xmlTagModel.xmlAttributeModels as xmlAttributeModel}
            <XmlAttributeModelEditor xmlAttributeModel={xmlAttributeModel} />
        {/each}  
    </span>
    
    <span class="dni_xml-tag-model-editor-children">
        {#if (xmlTagModel.children.xmlTagModels?.length ?? 0) > 0}
            <span>&gt;</span>
            <XmlFileEditor xmlFileModel={xmlTagModel.children} />
            <div>&lt;/{xmlTagModel.tagName}&gt;</div>
        {:else}
            <span>/&gt;</span>
        {/if}
    </span>
</div>