<script lang="ts">
    import { ContextualInformationDatum } from "../../../../out/ContextMenus/ContextualInformationDatum";
    import MenuOptionAddCSharpProjectReference from "./ContextMenuOptions/MenuOptionAddCSharpProjectReference.svelte";
    import MenuOptionAddExistingCSharpProject from "./ContextMenuOptions/MenuOptionAddExistingCSharpProject.svelte";
    import MenuOptionCreateDirectory from "./ContextMenuOptions/MenuOptionCreateDirectory.svelte";
    import MenuOptionCreateNewCSharpProject from "./ContextMenuOptions/MenuOptionCreateNewCSharpProject.svelte";
    import MenuOptionCreateNewEmptyFile from "./ContextMenuOptions/MenuOptionCreateNewEmptyFile.svelte";
    import MenuOptionCreateNewTemplatedFile from "./ContextMenuOptions/MenuOptionCreateNewTemplatedFile.svelte";
    import MenuOptionRefreshChildFiles from "./ContextMenuOptions/MenuOptionRefreshChildFiles.svelte";
import MenuOptionRemoveCSharpProjectReference from "./ContextMenuOptions/MenuOptionRemoveCSharpProjectReference.svelte";
import MenuOptionRemoveNugetPackageReference from "./ContextMenuOptions/MenuOptionRemoveNugetPackageReference.svelte";
    import MenuOptionStartDebugging from "./ContextMenuOptions/MenuOptionStartDebugging.svelte";
    import MenuOptionStartWithoutDebugging from "./ContextMenuOptions/MenuOptionStartWithoutDebugging.svelte";

    export let contextualInformation: ContextualInformationDatum[];
    export let closeMenu;
</script>

{#each contextualInformation as contextualInformationDatum}
    {#if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewTemplatedFile,
                                                        contextualInformationDatum)}
        <MenuOptionCreateNewTemplatedFile closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewEmptyFile,
                                                            contextualInformationDatum)}
        <MenuOptionCreateNewEmptyFile closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.refreshChildFiles,
                                                            contextualInformationDatum)}
        <MenuOptionRefreshChildFiles closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createDirectory,
                                                            contextualInformationDatum)}
        <MenuOptionCreateDirectory closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startWithoutDebugging,
                                                            contextualInformationDatum)}
        <MenuOptionStartWithoutDebugging closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.startDebugging,
                                                            contextualInformationDatum)}
        <MenuOptionStartDebugging closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewCSharpProject,
                                                            contextualInformationDatum)}
        <MenuOptionCreateNewCSharpProject closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addExistingCSharpProject,
                                                            contextualInformationDatum)}
        <MenuOptionAddExistingCSharpProject closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addProjectReference,
                                                            contextualInformationDatum)}
        <MenuOptionAddCSharpProjectReference closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeProjectReference,
                                                            contextualInformationDatum)}
        <MenuOptionRemoveCSharpProjectReference closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.removeNugetPackageReference,
                                                            contextualInformationDatum)}
        <MenuOptionRemoveNugetPackageReference closeMenu={closeMenu} />
    {/if}
{/each}