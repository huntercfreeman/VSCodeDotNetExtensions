<script lang="ts">
    export let onClickCallback: () => void;
    export let styleCss: string | undefined = undefined;
</script>

<button on:keydown|stopPropagation 
        on:click={onClickCallback} 
        style='{styleCss ?? ""}'
        class="dni_button">
    <slot></slot>
</button>

<style>
    .dni_button {
        margin-bottom: 5px;
    }
</style>