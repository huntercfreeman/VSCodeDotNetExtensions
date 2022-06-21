<script lang="ts">
import { getNonce } from "../../../../../out/IdGeneration/getNonce";
import { activeInputField } from "./xmlInputField";

	export let value: string;

    let activeInputFieldValue;

    let xmlInputFieldElement;
    let isEditable: boolean = false;
    let nonce = getNonce();
    
    activeInputField.subscribe((activeNonce) => {
        activeInputFieldValue = activeNonce;

        if (isEditable && nonce !== activeNonce) {
            isEditable = false;
        }
    });

    function setIsEditableOnClick() {
        isEditable = true;

        activeInputField.set(nonce);
    }

    function extendOnKeyDown(keyboardEvent) {
		if (keyboardEvent.code === "Escape" && isEditable) {
			isEditable = false;
		}
	}

	function onPageClick(e) {
		if (e.target === xmlInputFieldElement || 
            xmlInputFieldElement.contains(e.target)) 
                return;
		
        isEditable = false;
	}
</script>

<span class="dni_inline-flex dni_xml-input-field" 
      on:click={setIsEditableOnClick} 
      bind:this={xmlInputFieldElement}>

    {#if isEditable}
        <input class="dni_inline-flex" bind:value={value} />
    {:else}
        {value}
    {/if}
</span>

<svelte:body on:click={onPageClick} on:keydown={extendOnKeyDown} />