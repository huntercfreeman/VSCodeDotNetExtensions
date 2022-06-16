<script lang="ts">
    import { MessageReadActiveDotNetSolutionFile } from "../../../../out/Messages/Read/MessageReadActiveDotNetSolutionFile";

    let isExpanded = false;

    function syncWithSolutionExplorerWebview() {
        let messageReadActiveDotNetSolutionFile =
			new MessageReadActiveDotNetSolutionFile(undefined);

		tsVscode.postMessage({
			type: undefined,
			value: messageReadActiveDotNetSolutionFile,
		});
    }
</script>

<div style="margin-bottom: 5px;">
    <span>Toggle control buttons:</span>
    <input type="checkbox" bind:checked={isExpanded} />

    {#if isExpanded}
        <div>
            <button on:click={syncWithSolutionExplorerWebview}
                >Sync Active .NET Solution from Solution Explorer</button
            >
        </div>
    {/if}
</div>
