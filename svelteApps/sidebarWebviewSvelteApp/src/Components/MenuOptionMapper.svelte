<script lang="ts">
    import { ContextualInformationDatum } from "../../../../out/ContextMenus/ContextualInformationDatum";
    import MenuOptionAddCSharpProjectReference from "./ContextMenuOptions/MenuOptionAddCSharpProjectReference.svelte";
    import MenuOptionAddExistingCSharpProject from "./ContextMenuOptions/MenuOptionAddExistingCSharpProject.svelte";
    import MenuOptionCreateDirectory from "./ContextMenuOptions/MenuOptionCreateDirectory.svelte";
    import MenuOptionCreateNewCSharpProject from "./ContextMenuOptions/MenuOptionCreateNewCSharpProject.svelte";
    import MenuOptionCreateNewEmptyFile from "./ContextMenuOptions/MenuOptionCreateNewEmptyFile.svelte";
    import MenuOptionCreateNewSolutionFolder from "./ContextMenuOptions/MenuOptionCreateNewSolutionFolder.svelte";
    import MenuOptionCreateNewTemplatedFile from "./ContextMenuOptions/MenuOptionCreateNewTemplatedFile.svelte";
    import MenuOptionRefreshChildFiles from "./ContextMenuOptions/MenuOptionRefreshChildFiles.svelte";
    import MenuOptionRemoveCSharpProject from "./ContextMenuOptions/MenuOptionRemoveCSharpProject.svelte";
    import MenuOptionRemoveCSharpProjectReference from "./ContextMenuOptions/MenuOptionRemoveCSharpProjectReference.svelte";
    import MenuOptionRemoveNugetPackageReference from "./ContextMenuOptions/MenuOptionRemoveNugetPackageReference.svelte";
    import MenuOptionStartDebugging from "./ContextMenuOptions/MenuOptionStartDebugging.svelte";
    import MenuOptionStartWithoutDebugging from "./ContextMenuOptions/MenuOptionStartWithoutDebugging.svelte";

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
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addExistingCSharpProject, contextualInformationDatum)}
        <MenuOptionAddExistingCSharpProject {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addProjectReference, contextualInformationDatum)}
        <MenuOptionAddCSharpProjectReference {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProjectReference, contextualInformationDatum)}
        <MenuOptionRemoveCSharpProjectReference {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeNugetPackageReference, contextualInformationDatum)}
        <MenuOptionRemoveNugetPackageReference {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createSolutionFolder, contextualInformationDatum)}
        <MenuOptionCreateNewSolutionFolder {closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeCSharpProject, contextualInformationDatum)}
        <MenuOptionRemoveCSharpProject {closeMenu} />
    {/if}
{/each}
