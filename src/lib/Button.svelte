<script lang="ts">
    export let text: string;
    export let onClick = () => {};
    export let onPointerDown = () => {};
    export let onPointerUp = () => {};
    export let key: string = "";
</script>

{#if key == "small"}	
<button class="small-button shadow" on:click={onClick} on:pointerdown={onPointerDown} on:pointerup={onPointerUp}> 
    {text}
</button>
{:else if key == "arrow"}
    <button class="arrow shadow" on:click={onClick} on:pointerdown={onPointerDown} on:pointerup={onPointerUp}> 
        {text}
    </button>
{:else}
    <button class="button shadow" on:click={onClick} on:pointerdown={onPointerDown} on:pointerup={onPointerUp}> 
        {text}
    </button>
{/if}

<style>
	@import '../app.css';
</style>