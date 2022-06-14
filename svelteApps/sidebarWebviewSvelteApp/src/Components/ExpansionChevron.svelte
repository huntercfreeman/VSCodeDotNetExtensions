<script lang="ts">
    import ChevronRight from "./Icons/ChevronRight.svelte";
    import ChevronDown from "./Icons/ChevronDown.svelte";

    export let isExpanded: boolean;

    function toggleIsExpanded() {
        isExpanded = !isExpanded;
    }
</script>

<span on:click|stopPropagation={toggleIsExpanded}>
    {#if !isExpanded}
        <ChevronRight />
    {:else}
        <ChevronDown />
    {/if}
</span>
