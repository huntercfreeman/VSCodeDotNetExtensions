<script lang="ts">
    import { ContextualInformationDatum } from "../../../../out/ContextMenus/ContextualInformationDatum";
    import MenuOptionAddProjectReference from "./ContextMenuOptions/MenuOptionAddProjectReference.svelte";
    import MenuOptionAddExistingProject from "./ContextMenuOptions/MenuOptionAddExistingProject.svelte";
    import MenuOptionCreateDirectory from "./ContextMenuOptions/MenuOptionCreateDirectory.svelte";
    import MenuOptionCreateNewCSharpProject from "./ContextMenuOptions/MenuOptionCreateNewCSharpProject.svelte";
    import MenuOptionCreateNewFSharpProject from "./ContextMenuOptions/MenuOptionCreateNewFSharpProject.svelte";
    import MenuOptionCreateNewEmptyFile from "./ContextMenuOptions/MenuOptionCreateNewEmptyFile.svelte";
    import MenuOptionCreateNewTemplatedFile from "./ContextMenuOptions/MenuOptionCreateNewTemplatedFile.svelte";
    import MenuOptionRefreshChildFiles from "./ContextMenuOptions/MenuOptionRefreshChildFiles.svelte";
    import MenuOptionRemoveProject from "./ContextMenuOptions/MenuOptionRemoveProject.svelte";
    import MenuOptionRemoveProjectReference from "./ContextMenuOptions/MenuOptionRemoveProjectReference.svelte";
    import MenuOptionRemoveNugetPackageReference from "./ContextMenuOptions/MenuOptionRemoveNugetPackageReference.svelte";
    import MenuOptionStartDebugging from "./ContextMenuOptions/MenuOptionStartDebugging.svelte";
    import MenuOptionStartWithoutDebugging from "./ContextMenuOptions/MenuOptionStartWithoutDebugging.svelte";
    import MenuOptionPutProjectInSolutionFolder from "./ContextMenuOptions/MenuOptionPutProjectInSolutionFolder.svelte";
    import MenuOptionCopyFile from "./ContextMenuOptions/MenuOptionCopyFile.svelte";
    import MenuOptionCutFile from "./ContextMenuOptions/MenuOptionCutFile.svelte";
    import MenuOptionDeleteFile from "./ContextMenuOptions/MenuOptionDeleteFile.svelte";
    import MenuOptionPasteFile from "./ContextMenuOptions/MenuOptionPasteFile.svelte";
    import MenuOptionRename from "./ContextMenuOptions/MenuOptionRename.svelte";
    import MenuOptionExecuteFSharpScriptFile from "./ContextMenuOptions/MenuOptionExecuteFSharpScriptFile.svelte";

    export let contextualInformation: ContextualInformationDatum[];
    export let closeMenu;
    export let namespaceId: string;
	export let category;
	export let getNextIndex;
</script>

{#each contextualInformation as contextualInformationDatum}
    {#if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewTemplatedFile, contextualInformationDatum)}
        <MenuOptionCreateNewTemplatedFile {closeMenu} {namespaceId} index={getNextIndex()} {category} />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewEmptyFile, contextualInformationDatum)}
        <MenuOptionCreateNewEmptyFile {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.refreshChildFiles, contextualInformationDatum)}
        <MenuOptionRefreshChildFiles {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createDirectory, contextualInformationDatum)}
        <MenuOptionCreateDirectory {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startWithoutDebugging, contextualInformationDatum)}
        <MenuOptionStartWithoutDebugging {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startDebugging, contextualInformationDatum)}
        <MenuOptionStartDebugging {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewCSharpProject, contextualInformationDatum)}
        <MenuOptionCreateNewCSharpProject {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewFSharpProject, contextualInformationDatum)}
        <MenuOptionCreateNewFSharpProject {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.executeFSharpScriptFile, contextualInformationDatum)}
        <MenuOptionExecuteFSharpScriptFile {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addExistingProject, contextualInformationDatum)}
        <MenuOptionAddExistingProject {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addProjectReference, contextualInformationDatum)}
        <MenuOptionAddProjectReference {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProjectReference, contextualInformationDatum)}
        <MenuOptionRemoveProjectReference {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeNugetPackageReference, contextualInformationDatum)}
        <MenuOptionRemoveNugetPackageReference {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.putProjectInSolutionFolder, contextualInformationDatum)}
        <MenuOptionPutProjectInSolutionFolder {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProject, contextualInformationDatum)}
        <MenuOptionRemoveProject {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.copyFile, contextualInformationDatum)}
        <MenuOptionCopyFile {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.cutFile, contextualInformationDatum)}
        <MenuOptionCutFile {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.deleteFile, contextualInformationDatum)}
        <MenuOptionDeleteFile {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.paste, contextualInformationDatum)}
        <MenuOptionPasteFile {closeMenu} {namespaceId} index={getNextIndex()} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.rename, contextualInformationDatum)}
        <MenuOptionRename {closeMenu} {namespaceId} index={getNextIndex()} {category}  />
    {/if}
{/each}
