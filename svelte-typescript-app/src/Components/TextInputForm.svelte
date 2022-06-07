<script lang="ts">
    export let value: string;
    export let onCancel: any = () => value = undefined;
    export let onValidSubmit: any;
    export let onInvalidSubmit: any = undefined;

    function validate() {
        if (value) {
            onValidSubmit();
        }
        else if (onInvalidSubmit) {
            onInvalidSubmit();
        }
    }
    
    function extendOnKeyDown(keyboardEvent) {
        if (keyboardEvent.code === "Escape") {
            onCancel();
        }
    }
</script>

{#if value !== undefined}
    <input placeholder="Give Solution Folder Name" 
           bind:value="{value}"
           on:keydown|stopPropagation="{(e) => extendOnKeyDown(e)}" />
    <button on:click="{validate}">Confirm</button>
    <button on:click="{onCancel}">Cancel</button>
{/if}