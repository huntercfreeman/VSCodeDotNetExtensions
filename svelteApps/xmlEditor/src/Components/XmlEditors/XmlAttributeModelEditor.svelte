<script lang="ts">
    import type { XmlAttributeModel } from '../../../../../out/Parsers/XmlParseStateMachines'

	export let xmlAttributeModel: XmlAttributeModel;
</script>

<div class="dni_xml-attribute-model-editor">
    <div class="dni_xml-attribute-model-editor-name">
        <input bind:value={xmlAttributeModel.attributeName} /> 
    </div>

    <div class="dni_xml-attribute-model-editor-value">
        <input bind:value={xmlAttributeModel.attributeValue} /> 
    </div>
</div>