<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageReadNewProjectTemplatesOnComputer } from "../../../../../out/Messages/Read/MessageReadNewProjectTemplatesOnComputer";
    import { MessageCreateProjectInAny } from "../../../../../out/Messages/Create/MessageCreateProjectInAny";
    import { ConstantsFileExtensionsNoPeriod } from "../../../../../out/Constants/ConstantsFileExtensionsNoPeriod";

    export let closeMenu;

    let contextMenuTargetValue;
    let addCSharpProjectFilename: string | undefined;
    let addCSharpProjectTemplate: string | undefined;

    contextMenuTarget.subscribe((value) => {
        contextMenuTargetValue = value;
    });

    function createNewCSharpProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageCreateProjectInAny =
                    new MessageCreateProjectInAny(
                        contextMenuTargetValue,
                        addCSharpProjectFilename,
                        addCSharpProjectTemplate,
                        ConstantsFileExtensionsNoPeriod.C_SHARP_PROJECT_FILE_EXTENSION,
                        undefined
                    );

                tsVscode.postMessage({
                    type: undefined,
                    value: messageCreateProjectInAny,
                });
        }

        closeMenu();
    }

    function startFormNewCSharpProject() {
        let messageReadNewProjectTemplatesOnComputer =
            new MessageReadNewProjectTemplatesOnComputer();

        tsVscode.postMessage({
            type: undefined,
            value: messageReadNewProjectTemplatesOnComputer,
        });

        addCSharpProjectFilename = "";
        addCSharpProjectTemplate = "";
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startFormNewCSharpProject}
        text="New C# Project."
    />

    {#if addCSharpProjectFilename !== undefined && addCSharpProjectTemplate !== undefined}
        <input
            placeholder="C# Project name no extension"
            bind:value={addCSharpProjectFilename}
        />

        <div>'dotnet new --list'</div>
        <div>was ran for you in terminal</div>
        <input
            placeholder="Template Short Name"
            bind:value={addCSharpProjectTemplate}
        />

        <div>
            <div>
                <div>Create C# Project:</div>
                <div style="margin-left: 12px;">
                    <em>{addCSharpProjectFilename}</em>.csproj
                </div>
            </div>

            <div>
                <div>Use Template:</div>
                <div style="margin-left: 12px;">
                    <em>{addCSharpProjectTemplate}</em>
                </div>
            </div>
        </div>

        <button on:click={createNewCSharpProject}>Accept</button>
        <button on:click={closeMenu}>Decline</button>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
