<script lang="ts">
    import { activeFocusTarget } from "../activeFocus";

    export let isExpanded: boolean;
    export let styleCss: string | undefined = undefined;

    function onFocus() {
        activeFocusTarget.set("Checkbox - DotNetIdeCheckbox")
    }
     
    function onBlur() {
        activeFocusTarget.set(undefined)
    }
</script>

<input type="checkbox" 
       bind:checked={isExpanded} 
       on:keydown|stopPropagation
       on:focus={onFocus}
       on:blur="{onBlur}"
       style={styleCss ?? ""} 
       class="dni_input-checkbox" />

<style>
    .dni_input-checkbox {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>
