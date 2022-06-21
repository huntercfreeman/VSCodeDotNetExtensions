<script lang="ts">
    import type { XmlFileModel, XmlTagModel } from '../../../../out/Parsers/XmlParseStateMachines'
    import { ConstantsCSharpProjectFile } from '../../../../out/Constants/ConstantsCSharpProjectFile'
    import XmlTagTargetFrameworkEditor from './XmlEditors/XmlTagTargetFrameworkEditor.svelte';
    import XmlTagRootNamespaceEditor from './XmlEditors/XmlTagRootNamespaceEditor.svelte';
    import XmlTagNugetPackageEditor from './XmlEditors/XmlTagNugetPackageEditor.svelte';
    import XmlTagProjectReferenceEditor from './XmlEditors/XmlTagProjectReferenceEditor.svelte';

	export let xmlFileModel: XmlFileModel;

    // This is written in XmlFileModel class itself but does not JSON serialize
    function selectRecursively(xmlFileModel: XmlFileModel, predicate: (xmlTagModel: XmlTagModel) => boolean,
        matches: XmlTagModel[]) {

        for (let i = 0; i < xmlFileModel.xmlTagModels.length; i++) {
            let tagModel = xmlFileModel.xmlTagModels[i];

            if (predicate(tagModel)) {
                matches.push(tagModel);
            }

            selectRecursively(tagModel.children, predicate, matches);
        }
    }

    $: getTargetFrameworkTag = (() => {

        let targetFrameworkTag: XmlTagModel[] = [];

        selectRecursively(xmlFileModel,
            (x) => x.tagName === ConstantsCSharpProjectFile.TARGET_FRAMEWORK_TAG_NAME,
            targetFrameworkTag);

        return targetFrameworkTag;
	})();
    
    $: getRootNamespaceTag = (() => {

        let rootNamespaceTag: XmlTagModel[] = [];

        selectRecursively(xmlFileModel,
            (x) => x.tagName === ConstantsCSharpProjectFile.ROOT_NAMESPACE_TAG_NAME,
            rootNamespaceTag);

        return rootNamespaceTag;
	})();
    
    $: getNugetPackageTags = (() => {

        let nugetPackageTags: XmlTagModel[] = [];

        selectRecursively(xmlFileModel,
            (x) => x.tagName === ConstantsCSharpProjectFile.NUGET_PACKAGE_TAG_NAME,
            nugetPackageTags);

        return nugetPackageTags;
	})();

    $: getProjectReferenceTags = (() => {

        let projectReferenceTags: XmlTagModel[] = [];

        selectRecursively(xmlFileModel,
            (x) => x.tagName === ConstantsCSharpProjectFile.PROJECT_REFERENCE_TAG_NAME,
            projectReferenceTags);

        return projectReferenceTags;
	})();
</script>

<span class="dni_xml-file-model-editor">

    <XmlTagTargetFrameworkEditor targetFrameworkTag={getTargetFrameworkTag} />

    <XmlTagRootNamespaceEditor rootNamespaceTag={getRootNamespaceTag} />

    <XmlTagNugetPackageEditor nugetPackageTags={getNugetPackageTags} />

    <XmlTagProjectReferenceEditor projectReferenceTags={getProjectReferenceTags} />
</span>