<script lang="ts">
	export let value: string;

    let isEditable: boolean = false;
</script>

<span class="dni_xml-input-field" on:click={() => isEditable = !isEditable}>
    {#if isEditable}
        <input bind:value={value} />
    {:else}
        {value}
    {/if}
</span>