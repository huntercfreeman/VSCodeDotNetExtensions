<script lang="ts">
import { getNonce } from "../../../../../out/IdGeneration/getNonce";
import { activeInputField } from "./xmlInputField";

	export let value: string;

    let activeInputFieldValue;

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
</script>

<span class="dni_xml-input-field" on:click={setIsEditableOnClick}>
    {#if isEditable}
        <input bind:value={value} />
    {:else}
        {value}
    {/if}
</span>