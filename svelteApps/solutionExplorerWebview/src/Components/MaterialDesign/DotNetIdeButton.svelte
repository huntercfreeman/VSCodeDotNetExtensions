<script lang="ts">
    import { activeFocusTarget } from "../activeFocus"
    
    export let onClickCallback: () => void;
    export let styleCss: string | undefined = undefined;

    function onFocus() {
        activeFocusTarget.set("Button - DotNetIdeButton")
    }
    
    function onBlur() {
        activeFocusTarget.set(undefined)
    }
</script>

<button on:keydown|stopPropagation  
        on:click={onClickCallback}
        on:focus={onFocus}
        on:blur="{onBlur}"
        style='{styleCss ?? ""}'
        class="dni_button">
    <slot></slot>
</button>

<style>
    .dni_button {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>