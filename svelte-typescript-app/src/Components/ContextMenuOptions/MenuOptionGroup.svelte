<script lang="ts">
import { copyFile } from "fs";

    import { ContextualInformationDatum } from "../../../../out/ContextMenus/ContextualInformationDatum";
import MenuOptionAddExistingCSharpProject from "./MenuOptionAddExistingCSharpProject.svelte";
import MenuOptionCopyFile from "./MenuOptionCopyFile.svelte";
    import MenuOptionCreateDirectory from "./MenuOptionCreateDirectory.svelte";
import MenuOptionCreateNewCSharpProject from "./MenuOptionCreateNewCSharpProject.svelte";
    import MenuOptionCreateNewEmptyFile from "./MenuOptionCreateNewEmptyFile.svelte";
    import MenuOptionCreateNewTemplatedFile from "./MenuOptionCreateNewTemplatedFile.svelte";
import MenuOptionCutFile from "./MenuOptionCutFile.svelte";
import MenuOptionPaste from "./MenuOptionPaste.svelte";
    import MenuOptionRefreshChildFiles from "./MenuOptionRefreshChildFiles.svelte";
import MenuOptionRenameFile from "./MenuOptionRenameFile.svelte";
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
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.createNewCSharpProject,
                                                            contextualInformationDatum)}
        <MenuOptionCreateNewCSharpProject closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.addExistingCSharpProject,
                                                            contextualInformationDatum)}
        <MenuOptionAddExistingCSharpProject closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.copyFile,
                                                            contextualInformationDatum)}
        <MenuOptionCopyFile closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.cutFile,
                                                            contextualInformationDatum)}
        <MenuOptionCutFile closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.paste,
                                                            contextualInformationDatum)}
        <MenuOptionPaste closeMenu={closeMenu} />
    {:else if ContextualInformationDatum.checkDatumEquality(ContextualInformationDatum.rename,
                                                            contextualInformationDatum)}
        <MenuOptionRenameFile closeMenu={closeMenu} />
    {/if}
{/each}