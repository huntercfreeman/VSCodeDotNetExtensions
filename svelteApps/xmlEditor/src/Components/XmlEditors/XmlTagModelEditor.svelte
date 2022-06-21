<script lang="ts">
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import XmlAttributeModelEditor from './XmlAttributeModelEditor.svelte';
    import XmlFileEditor from './XmlFileEditor.svelte';
    import XmlInputField from './XmlInputField.svelte';

	export let xmlTagModel: XmlTagModel;
    export let displayChildren: boolean = true;
</script>

<span class="dni_inline-flex dni_xml-tag-model-editor">
    <span class="dni_inline-flex dni_xml-tag-model-editor-tag-name">
        <span class="dni_inline-flex">&lt;</span>
        <XmlInputField bind:value={xmlTagModel.tagName} />
        
        {#if (xmlTagModel.xmlAttributeModels?.length ?? 0) === 0}
            <span class="dni_inline-flex">&gt;</span>
        {:else}
            &nbsp;
        {/if}
    </span>

    <span class="dni_inline-flex dni_xml-tag-model-editor-attributes">
        {#each xmlTagModel.xmlAttributeModels as xmlAttributeModel}
            <XmlAttributeModelEditor xmlAttributeModel={xmlAttributeModel} />
        {/each}
    </span>
    
    <span class="dni_inline-flex dni_xml-tag-model-editor-children">
        {#if displayChildren && ((xmlTagModel.children.xmlTagModels?.length ?? 0) > 0)}
            <span class="dni_inline-flex">&gt;</span>

            <br/>
            <XmlFileEditor xmlFileModel={xmlTagModel.children} />
            
            <div class="dni_inline-flex">&lt;/{xmlTagModel.tagName}&gt;</div>
        {:else}
            <span class="dni_inline-flex">/&gt;</span>
        {/if}
    </span>
</span>