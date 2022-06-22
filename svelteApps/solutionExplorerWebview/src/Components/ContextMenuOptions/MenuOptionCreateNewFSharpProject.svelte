<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageReadNewProjectTemplatesOnComputer } from "../../../../../out/Messages/Read/MessageReadNewProjectTemplatesOnComputer";
    import { MessageCreateProjectInAny } from "../../../../../out/Messages/Create/MessageCreateProjectInAny";

    export let closeMenu;

    let contextMenuTargetValue;
    let addFSharpProjectFilename: string | undefined;
    let addFSharpProjectTemplate: string | undefined;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function createNewFSharpProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
            case FileKind.solutionFolder:
                let messageCreateProjectInAny =
                    new MessageCreateProjectInAny(
                        contextMenuTargetValue,
                        addFSharpProjectFilename,
                        addFSharpProjectTemplate
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageCreateProjectInAny,
                });
        }

        closeMenu();
    }

    function startFormNewFSharpProject() {
        let messageReadNewProjectTemplatesOnComputer =
            new MessageReadNewProjectTemplatesOnComputer();

        tsVscode.postMessage({
            type: undefined,
            value: messageReadNewProjectTemplatesOnComputer,
        });

        addFSharpProjectFilename = "";
        addFSharpProjectTemplate = "";
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startFormNewFSharpProject}
        text="New F# Project."
    />

    {#if addFSharpProjectFilename !== undefined && addFSharpProjectTemplate !== undefined}
        <input
            placeholder="F# Project name no extension"
            bind:value={addFSharpProjectFilename}
        />

        <div>'dotnet new --list'</div>
        <div>was ran for you in terminal</div>
        <input
            placeholder="Template Short Name"
            bind:value={addFSharpProjectTemplate}
        />

        <div>
            <div>
                <div>Create F# Project:</div>
                <div style="margin-left: 12px;">
                    <em>{addFSharpProjectFilename}</em>.csproj
                </div>
            </div>

            <div>
                <div>Use Template:</div>
                <div style="margin-left: 12px;">
                    <em>{addFSharpProjectTemplate}</em>
                </div>
            </div>
        </div>

        <button on:click={createNewFSharpProject}>Accept</button>
        <button on:click={closeMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
