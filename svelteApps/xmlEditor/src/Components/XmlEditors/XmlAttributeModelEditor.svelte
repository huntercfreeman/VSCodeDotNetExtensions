<script lang="ts">
    import type { XmlAttributeModel } from '../../../../../out/Parsers/XmlParseStateMachines'
import XmlInputField from './XmlInputField.svelte';

	export let xmlAttributeModel: XmlAttributeModel;
</script>

<span class="dni_inline-flex dni_xml-attribute-model-editor">
    <span class="dni_inline-flex dni_xml-attribute-model-editor-name">
        <XmlInputField bind:value={xmlAttributeModel.attributeName} />
    </span>

    <span class="dni_inline-flex dni_xml-attribute-model-editor-equals">=</span>

    <span class="dni_inline-flex dni_xml-attribute-model-editor-value">
        <span class="dni_inline-flex dni_xml-attribute-model-editor-quote">"</span>
        <XmlInputField bind:value={xmlAttributeModel.attributeValue} />
        <span class="dni_inline-flex dni_xml-attribute-model-editor-quote">"&nbsp;</span>
    </span>
</span>