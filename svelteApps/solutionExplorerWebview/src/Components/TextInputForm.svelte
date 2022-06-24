<script lang="ts">
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
    <button on:keydown|stopPropagation on:click={validate}>Confirm</button>
    <button on:keydown|stopPropagation on:click={onCancel}>Cancel</button>
{/if}
