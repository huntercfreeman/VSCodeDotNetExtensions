<script lang="ts">
    import { contextMenuTarget } from "../menu";
    import MenuOption from "../MenuOption.svelte";
    import DotNetIdeButton from "../MaterialDesign/DotNetIdeButton.svelte";
    import { FileKind } from "../../../../../out/FileSystem/FileKind";
    import { MessageReadNewProjectTemplatesOnComputer } from "../../../../../out/Messages/Read/MessageReadNewProjectTemplatesOnComputer";
    import { MessageCreateProjectInAny } from "../../../../../out/Messages/Create/MessageCreateProjectInAny";
    import { ConstantsFileExtensionsNoPeriod } from "../../../../../out/Constants/ConstantsFileExtensionsNoPeriod";
import DotNetIdeInputText from "../MaterialDesign/DotNetIdeInputText.svelte";

    export let closeMenu;
    export let idNamespace: string;
    export let index: number;
	export let category;

	$: contextMenuTargetValue = $contextMenuTarget;

    $: isFocusedCssClass = isFocused
        ? "dni_focused"
        : "";
        
    let isFocused = false;

    let addCSharpProjectFilename: string | undefined;
    let addCSharpProjectTemplate: string | undefined;

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

    function onKeyDown() {
    }
</script>

{#if contextMenuTargetValue}
    <div class="dni_menu-option {isFocusedCssClass}">
        <MenuOption
            onClickStopPropagation={true}
            onClick={startFormNewCSharpProject}
			{closeMenu}
            text="New C# Project."
            {idNamespace}
            {index}
            {category}
            bind:isFocused={isFocused}
        />

        {#if addCSharpProjectFilename !== undefined && addCSharpProjectTemplate !== undefined}

            <DotNetIdeInputText bind:value={addCSharpProjectFilename}
                placeholder="C# Project name no extension" />

            <div>'dotnet new --list'</div>
            <div>was ran for you in terminal</div>

            <DotNetIdeInputText bind:value={addCSharpProjectTemplate}
                                placeholder="Template Short Name" />

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

            <DotNetIdeButton onClickCallback={createNewCSharpProject}>
                Accept
            </DotNetIdeButton>

            <DotNetIdeButton onClickCallback={closeMenu}>
                Decline
            </DotNetIdeButton>
        {/if}
    </div>
{/if}

<style>
    em {
        font-style: normal;
        color: var(--vscode-editorInfo-foreground);
    }
</style>
