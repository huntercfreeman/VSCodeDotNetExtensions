<script lang="ts">
    import type { XmlAttributeModel, XmlTagModel } from '../../../../../out/Parsers/XmlParseStateMachines'
import XmlTagModelEditor from './XmlTagModelEditor.svelte';

	export let nugetPackageTags: XmlTagModel[] = [];
</script>

<div class="dni_xml-tag-nuget-package-editor">
    {#each nugetPackageTags as nugetPackageTag}
        <div class="dni_xml-tag-nuget-package">
            <XmlTagModelEditor xmlTagModel={nugetPackageTag} />
        </div>
    {/each}
</div>