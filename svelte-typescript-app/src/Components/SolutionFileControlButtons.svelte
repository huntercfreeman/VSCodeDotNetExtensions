<script lang="ts">
	import { MessageCreateDotNetSolutionInWorkspace } from "../../../out/Messages/Create/MessageCreateDotNetSolutionInWorkspace";

    export let getSolutionFilesInWorkspace;

    let isExpanded = false;

    function createNewSln() {
		let messageCreateDotNetSolutionInWorkspace = new MessageCreateDotNetSolutionInWorkspace();

		tsVscode.postMessage({
			type: undefined,
			value: messageCreateDotNetSolutionInWorkspace
		});
	}
</script>

<div style="margin-bottom: 5px;">
    <span>Toggle control buttons:</span>
    <input type="checkbox" bind:checked="{isExpanded}" />

    {#if isExpanded}
        <button on:click={createNewSln} style="margin-bottom: 5px;">
            New Sln
        </button>

        <button on:click={getSolutionFilesInWorkspace} style="margin-bottom: 5px;">
            Reload Solutions In Workspace
        </button>    
    {/if}
</div>