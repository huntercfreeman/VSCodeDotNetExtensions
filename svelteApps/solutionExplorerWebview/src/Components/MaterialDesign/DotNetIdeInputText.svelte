<script lang="ts">
    export let value: string;
    export let placeholder: string;
    export let styleCss: string | undefined = undefined;
</script>

<input
    {placeholder}
    bind:value
    on:keydown|stopPropagation
    style={styleCss ?? ""}
    class="dni_input"
/>

<style>
    .dni_input {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>
