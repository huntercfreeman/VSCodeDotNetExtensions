<script>
    import { onMount } from 'svelte';
    import { ConstantsMessages } from '../../src/Constants/ConstantsMessages'

    // let solutionAbsoluteFilePathsInWorkspace: AbsoluteFilePath[]; relative path: "src\FileSystem\AbsoluteFilePath.ts"
    let solutionAbsoluteFilePathsInWorkspace = null;
    
    function getProjects() {
		tsVscode.postMessage(ConstantsMessages.ConstructLoadSolutionsInWorkspaceMessage(null));
	}
    
    onMount(async () => {
        window.addEventListener("message", async (event) => {
            const message = event.data;
            switch (message.type) {
                case ConstantsMessages.LOAD_SOLUTIONS_IN_WORKSPACE:
                    solutionAbsoluteFilePathsInWorkspace = ConstantsMessages.UnwrapLoadSolutionsInWorkspaceMessage(message);
            }
        });
	});
</script>

<h3>Hello World! DotNetIde.svelte</h3>

<div>
    {#each solutionAbsoluteFilePathsInWorkspace as solutionAbsoluteFilePath}
        <div>
            {solutionAbsoluteFilePath.absoluteFilePathString}
        </div>
    {/each}
</div>