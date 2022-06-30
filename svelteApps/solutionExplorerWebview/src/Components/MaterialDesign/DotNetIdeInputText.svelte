<script lang="ts">
    export let value: string;
    export let placeholder: string;
    export let styleCss: string | undefined = undefined;
    export let onKeyDown: (e: KeyboardEvent) => void = 
        (e: KeyboardEvent) => { };
</script>

<input
    {placeholder}
    bind:value
    on:keydown|stopPropagation={onKeyDown}
    style={styleCss ?? ""}
    class="dni_input-text"
/>

<style>
    .dni_input-text {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>
