<script lang="ts">
    import { children } from 'svelte/internal';
    import type { XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import XmlAttributeModelEditor from './XmlAttributeModelEditor.svelte';
    import XmlFileEditor from './XmlFileEditor.svelte';
import XmlInputField from './XmlInputField.svelte';

	export let xmlTagModel: XmlTagModel;
</script>

<div class="dni_xml-tag-model-editor">
    <span class="dni_xml-tag-model-editor-tag-name">
        <span>&lt;</span>
        <XmlInputField bind:value={xmlTagModel.tagName} />
        <span>&gt;</span>
    </span>

    <span class="dni_xml-tag-model-editor-attributes">
        {#each xmlTagModel.xmlAttributeModels as xmlAttributeModel}
            <XmlAttributeModelEditor xmlAttributeModel={xmlAttributeModel} />
        {/each}  
    </span>

    <span class="dni_xml-tag-model-editor-children">
        {#if xmlTagModel.children}
            <XmlFileEditor xmlFileModel={xmlTagModel.children} />
        {/if}
    </span>

    {#if xmlTagModel.children}
        <div>&lt;/{xmlTagModel.tagName}&gt;</div>
    {:else}
        <span>/&gt;</span>
    {/if}
</div>