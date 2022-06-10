<script lang="ts">
    import { ContextualInformationDatum } from "../../../../out/ContextMenus/ContextualInformationDatum";
    import MenuOptionCreateDirectory from "./MenuOptionCreateDirectory.svelte";
    import MenuOptionCreateNewEmptyFile from "./MenuOptionCreateNewEmptyFile.svelte";
    import MenuOptionCreateNewTemplatedFile from "./MenuOptionCreateNewTemplatedFile.svelte";
    import MenuOptionRefreshChildFiles from "./MenuOptionRefreshChildFiles.svelte";
import MenuOptionStartWithoutDebugging from "./MenuOptionStartWithoutDebugging.svelte";

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
    {/if}
{/each}