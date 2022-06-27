<script lang="ts">
    import ChevronRight from "./Icons/ChevronRight.svelte";
    import ChevronDown from "./Icons/ChevronDown.svelte";

    export let isExpanded: boolean;
    export let onClickAction: (() => void) | undefined = undefined

    function toggleIsExpanded() {
        isExpanded = !isExpanded;

        if (onClickAction) {
            onClickAction();
        }
    }
</script>

<span class="dni_expansion-chevron" on:click|stopPropagation={toggleIsExpanded}>
    {#if !isExpanded}
        <ChevronRight />
    {:else}
        <ChevronDown />
    {/if}
</span>
