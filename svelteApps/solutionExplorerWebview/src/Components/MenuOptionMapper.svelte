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
    export let idNamespace: string;
	export let category;
</script>

{#each contextualInformation as contextualInformationDatum, index}
    {#if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewTemplatedFile, contextualInformationDatum)}
        <MenuOptionCreateNewTemplatedFile {closeMenu} {idNamespace} {index} {category} />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewEmptyFile, contextualInformationDatum)}
        <MenuOptionCreateNewEmptyFile {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.refreshChildFiles, contextualInformationDatum)}
        <MenuOptionRefreshChildFiles {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createDirectory, contextualInformationDatum)}
        <MenuOptionCreateDirectory {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startWithoutDebugging, contextualInformationDatum)}
        <MenuOptionStartWithoutDebugging {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startDebugging, contextualInformationDatum)}
        <MenuOptionStartDebugging {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewCSharpProject, contextualInformationDatum)}
        <MenuOptionCreateNewCSharpProject {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewFSharpProject, contextualInformationDatum)}
        <MenuOptionCreateNewFSharpProject {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.executeFSharpScriptFile, contextualInformationDatum)}
        <MenuOptionExecuteFSharpScriptFile {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addExistingProject, contextualInformationDatum)}
        <MenuOptionAddExistingProject {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addProjectReference, contextualInformationDatum)}
        <MenuOptionAddProjectReference {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProjectReference, contextualInformationDatum)}
        <MenuOptionRemoveProjectReference {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeNugetPackageReference, contextualInformationDatum)}
        <MenuOptionRemoveNugetPackageReference {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.putProjectInSolutionFolder, contextualInformationDatum)}
        <MenuOptionPutProjectInSolutionFolder {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProject, contextualInformationDatum)}
        <MenuOptionRemoveProject {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.copyFile, contextualInformationDatum)}
        <MenuOptionCopyFile {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.cutFile, contextualInformationDatum)}
        <MenuOptionCutFile {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.deleteFile, contextualInformationDatum)}
        <MenuOptionDeleteFile {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.paste, contextualInformationDatum)}
        <MenuOptionPasteFile {closeMenu} {idNamespace} {index} {category}  />

    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.rename, contextualInformationDatum)}
        <MenuOptionRename {closeMenu} {idNamespace} {index} {category}  />
    {/if}
{/each}
