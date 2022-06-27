<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageReadNewProjectTemplatesOnComputer } from "../../../../../out/Messages/Read/MessageReadNewProjectTemplatesOnComputer";
    import { MessageCreateProjectInAny } from "../../../../../out/Messages/Create/MessageCreateProjectInAny";
    import { ConstantsFileExtensionsNoPeriod } from "../../../../../out/Constants/ConstantsFileExtensionsNoPeriod";
    import { ConstantsDotNetCli } from "../../../../../out/Constants/ConstantsDotNetCli";
import DotNetIdeInputText from "../MaterialDesign/DotNetIdeInputText.svelte";

    export let closeMenu;

    $: contextMenuTargetValue = $contextMenuTarget;

    let addFSharpProjectFilename: string | undefined;
    let addFSharpProjectTemplate: string | undefined;

    function createNewFSharpProject() {
        switch (contextMenuTargetValue.fileKind) {
            case FileKind.solution:
                let messageCreateProjectInAny =
                    new MessageCreateProjectInAny(
                        contextMenuTargetValue,
                        addFSharpProjectFilename,
                        addFSharpProjectTemplate,
                        ConstantsFileExtensionsNoPeriod.F_SHARP_PROJECT_FILE_EXTENSION,
                        ConstantsDotNetCli.LANG_F_SHARP
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

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <MenuOption
        onClickStopPropagation={true}
        onClick={startFormNewFSharpProject}
        text="New F# Project."
    />

    {#if addFSharpProjectFilename !== undefined && addFSharpProjectTemplate !== undefined}

        <DotNetIdeInputText bind:value={addFSharpProjectFilename}
                            placeholder="F# Project name no extension" />

        <div>'dotnet new --list'</div>
        <div>was ran for you in terminal</div>

        <DotNetIdeInputText bind:value={addFSharpProjectTemplate}
                            placeholder="Template Short Name" />

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

        <DotNetIdeButton onClickCallback={createNewFSharpProject}>
            Accept
        </DotNetIdeButton>

        <DotNetIdeButton onClickCallback={closeMenu}>
            Decline
        </DotNetIdeButton>
    {/if}
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
