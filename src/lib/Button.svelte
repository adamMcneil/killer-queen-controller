<script lang="ts">
    export let text: string;
    export let onClick = () => (console.log("hello world"));
    export let key: string = "";
</script>

{#if key == "small"}	
<button class="small-button shadow" on:click={onClick}> 
    {text}
</button>
{:else if key == "arrow"}
    <button class="arrow shadow" on:click={onClick}> 
        {text}
    </button>
{:else}
    <button class="button shadow" on:click={onClick}> 
        {text}
    </button>
{/if}

<style>
	@import '../app.css';
</style>