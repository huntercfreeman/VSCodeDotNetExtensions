<script lang="ts">
    import { MessageCreateDotNetSolutionInWorkspace } from "../../../../out/Messages/Create/MessageCreateDotNetSolutionInWorkspace";
import DotNetIdeButton from "./MaterialDesign/DotNetIdeButton.svelte";
    import TextInputForm from "./TextInputForm.svelte";

    export let getSolutionFilesInWorkspace;

    let isExpanded = false;

    let addSolutionWithSpecifiedName: string | undefined;

    function createNewSln() {
        let trimmedInput = addSolutionWithSpecifiedName.trim();
        addSolutionWithSpecifiedName = undefined;

        let messageCreateDotNetSolutionInWorkspace =
            new MessageCreateDotNetSolutionInWorkspace(trimmedInput);

        tsVscode.postMessage({
            type: undefined,
            value: messageCreateDotNetSolutionInWorkspace,
        });
    }

    function startNewSlnForm() {
        addSolutionWithSpecifiedName = "";
    }
</script>

<div style="margin-bottom: 5px;">
    <span>Toggle control buttons:</span>
    <input type="checkbox" bind:checked={isExpanded} on:keydown|stopPropagation />

    {#if isExpanded}
        <div>
            <DotNetIdeButton onClickCallback={startNewSlnForm}>
                New Sln
            </DotNetIdeButton>

            {#if addSolutionWithSpecifiedName !== undefined}
                <DotNetIdeButton onClickCallback={createNewSln}>
                    Opt for Default Solution Name
                </DotNetIdeButton>

                <TextInputForm
                    bind:value={addSolutionWithSpecifiedName}
                    onValidSubmit={createNewSln}
                    placeholder="Solution name no extension"
                />
            {/if}
        </div>

        <DotNetIdeButton onClickCallback={getSolutionFilesInWorkspace}>
            Reload Solutions In Workspace
        </DotNetIdeButton>
    {/if}
</div>
