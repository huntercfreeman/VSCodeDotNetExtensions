<script lang="ts">
    import type { XmlFileModel, XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
    import XmlTagModelEditor from './XmlTagModelEditor.svelte';

	export let xmlFileModel: XmlFileModel;
</script>

<div class="dni_xml-file-model-editor">
    {#each xmlFileModel.xmlTagModels as xmlTagModel}
        <XmlTagModelEditor xmlTagModel={xmlTagModel} />
    {/each}
</div>