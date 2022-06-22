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

    export let contextualInformation: ContextualInformationDatum[];
    export let closeMenu;
</script>

{#each contextualInformation as contextualInformationDatum}
    {#if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewTemplatedFile, contextualInformationDatum)}
        <MenuOptionCreateNewTemplatedFile {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewEmptyFile, contextualInformationDatum)}
        <MenuOptionCreateNewEmptyFile {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.refreshChildFiles, contextualInformationDatum)}
        <MenuOptionRefreshChildFiles {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createDirectory, contextualInformationDatum)}
        <MenuOptionCreateDirectory {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startWithoutDebugging, contextualInformationDatum)}
        <MenuOptionStartWithoutDebugging {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startDebugging, contextualInformationDatum)}
        <MenuOptionStartDebugging {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewCSharpProject, contextualInformationDatum)}
        <MenuOptionCreateNewCSharpProject {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewFSharpProject, contextualInformationDatum)}
        <MenuOptionCreateNewFSharpProject {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addExistingProject, contextualInformationDatum)}
        <MenuOptionAddExistingProject {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addProjectReference, contextualInformationDatum)}
        <MenuOptionAddProjectReference {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProjectReference, contextualInformationDatum)}
        <MenuOptionRemoveProjectReference {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeNugetPackageReference, contextualInformationDatum)}
        <MenuOptionRemoveNugetPackageReference {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.putProjectInSolutionFolder, contextualInformationDatum)}
        <MenuOptionPutProjectInSolutionFolder {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProject, contextualInformationDatum)}
        <MenuOptionRemoveProject {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.copyFile, contextualInformationDatum)}
        <MenuOptionCopyFile {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.cutFile, contextualInformationDatum)}
        <MenuOptionCutFile {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.deleteFile, contextualInformationDatum)}
        <MenuOptionDeleteFile {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.paste, contextualInformationDatum)}
        <MenuOptionPasteFile {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.rename, contextualInformationDatum)}
        <MenuOptionRename {closeMenu} />
    {/if}
{/each}
