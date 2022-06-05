<script lang="ts">
    import ChevronRight from "./Icons/chevronRight.svelte";
    import ChevronDown from "./Icons/chevronDown.svelte";

	export let isExpanded: boolean;

    function toggleIsExpanded() {
        isExpanded = !isExpanded;
    }
</script>

<span on:click="{toggleIsExpanded}">
	{#if !isExpanded}
        <ChevronRight />
    {:else}
        <ChevronDown />
    {/if}
</span>