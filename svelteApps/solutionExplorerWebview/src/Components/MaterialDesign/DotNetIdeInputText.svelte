<script lang="ts">
    import { activeFocusTarget } from "../activeFocus";

    export let value: string;
    export let placeholder: string;
    export let styleCss: string | undefined = undefined;

    function onFocus() {
        activeFocusTarget.set("Text - DotNetIdeText")
    }
    
    function onBlur() {
        activeFocusTarget.set(undefined)
    }
</script>

<input
    {placeholder}
    bind:value
    on:keydown|stopPropagation
    on:focus={onFocus}
    on:blur="{onBlur}"
    style={styleCss ?? ""}
    class="dni_input-text"
/>

<style>
    .dni_input-text {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>
