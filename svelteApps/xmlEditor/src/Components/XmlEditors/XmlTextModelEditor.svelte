<script lang="ts">
    import { text } from 'stream/consumers';
import type { XmlTextModel } from '../../../../../out/Parsers/XmlParseStateMachines'
import XmlInputField from './XmlInputField.svelte';

	export let xmlTextModel: XmlTextModel;
</script>

<span class="dni_xml-text-model-editor">
    <XmlInputField bind:value={xmlTextModel.text} />
</span>