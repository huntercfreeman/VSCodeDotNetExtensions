<script lang="ts">
import DotNetIdeButton from "./MaterialDesign/DotNetIdeButton.svelte";


    export let value: string;
    export let onCancel: any = () => (value = undefined);
    export let onValidSubmit: any;
    export let onInvalidSubmit: any = undefined;
    export let placeholder: string;

    function validate() {
        if (value) {
            onValidSubmit();
            value = undefined;
        } else if (onInvalidSubmit) {
            onInvalidSubmit();
        }
    }

    function extendOnKeyDown(keyboardEvent) {
        if (keyboardEvent.code === "Escape") {
            onCancel();
        } else if (keyboardEvent.code === "Enter") {
            validate();
        }
    }
</script>

{#if value !== undefined}
    <input
        {placeholder}
        bind:value
        on:keydown|stopPropagation={(e) => extendOnKeyDown(e)}
    />

    <DotNetIdeButton onClickCallback={validate}>
        Accept
    </DotNetIdeButton>

    <DotNetIdeButton onClickCallback={onCancel}>
        Decline
    </DotNetIdeButton>
{/if}
