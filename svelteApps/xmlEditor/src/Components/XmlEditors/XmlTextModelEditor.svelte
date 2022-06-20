<script lang="ts">
    import type { XmlTextModel } from '../../../../../out/Parsers/XmlParseStateMachines'

	export let xmlTextModel: XmlTextModel;
</script>

<div class="dni_xml-text-model-editor">
    <input bind:value={xmlTextModel.text} />
</div>