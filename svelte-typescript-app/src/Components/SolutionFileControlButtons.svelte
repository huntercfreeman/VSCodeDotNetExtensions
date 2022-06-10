<script lang="ts">
	import { MessageCreateDotNetSolutionInWorkspace } from "../../../out/Messages/Create/MessageCreateDotNetSolutionInWorkspace";
    import TextInputForm from "./TextInputForm.svelte";

    export let getSolutionFilesInWorkspace;

    let isExpanded = false;

    let addSolutionWithSpecifiedName: string | undefined;

    function createNewSln() {
        let trimmedInput = addSolutionWithSpecifiedName.trim();
        addSolutionWithSpecifiedName = undefined;

		let messageCreateDotNetSolutionInWorkspace = new MessageCreateDotNetSolutionInWorkspace(trimmedInput);

		tsVscode.postMessage({
			type: undefined,
			value: messageCreateDotNetSolutionInWorkspace
		});
	}
    
    function startNewSlnForm() {
		addSolutionWithSpecifiedName = "";
	}
</script>

<div style="margin-bottom: 5px;">
    <span>Toggle control buttons:</span>
    <input type="checkbox" bind:checked="{isExpanded}" />

    {#if isExpanded}
        <div>
            <button on:click={startNewSlnForm} style="margin-bottom: 5px;">
                New Sln
            </button>
            
            {#if addSolutionWithSpecifiedName !== undefined}
                <button on:click={createNewSln}>
                    Opt for Default Solution Name
                </button>
                <TextInputForm bind:value="{addSolutionWithSpecifiedName}"
                        onValidSubmit="{createNewSln}"
                        placeholder="Solution name no extension" />
            {/if}
        </div>

        <button on:click={getSolutionFilesInWorkspace} style="margin-bottom: 5px;">
            Reload Solutions In Workspace
        </button>    
    {/if}
</div>