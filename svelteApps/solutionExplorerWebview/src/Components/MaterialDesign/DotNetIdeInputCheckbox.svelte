<script lang="ts">
    export let isExpanded: boolean;
    export let styleCss: string | undefined = undefined;
</script>

<input type="checkbox" 
       bind:checked={isExpanded} 
       on:keydown|stopPropagation
       style={styleCss ?? ""} 
       class="dni_input-checkbox" />

<style>
    .dni_input-checkbox {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>


