<script lang="ts">
import {
    onMount
} from 'svelte';
import Button from "$lib/Button.svelte";
import InputField from '$lib/InputField.svelte';
let game_state: string;
let ip: string;
let valid_states: Set<string> = new Set<string>(["join", "controller"]);

onMount(() => {
    if (!localStorage.getItem('game_state')) {
        localStorage.setItem('game_state', 'join');
        game_state = 'join';
    } else {
        if (valid_states.has(localStorage.getItem('game_state'))) {
            game_state = localStorage.getItem('game_state');
        } else {
            localStorage.setItem('game_state', 'join');
            game_state = 'join';
        }
    }
});

function onJoin() {
    game_state = "controller"
    localStorage.setItem('game_state', game_state);

}

function onLeave() {
    game_state = "join"
    localStorage.setItem('game_state', game_state);

}
</script>

<main>
    {#if game_state == "join"}
    <div>
	    <InputField bind:value={ip} text="enter the ip address" />
    </div>
    <div>
        <Button text="Join" onClick={onJoin} key = ""/>
    </div>
    {:else}
    <div>
        <Button text="<" onClick={() => console.log("hello")} key = "arrow"/>
        <Button text=">" onClick={() => console.log("hello")} key = "arrow"/>
        <Button text="jump" onClick={() => console.log("hello")} key = ""/>
        <Button text="dive" onClick={() => console.log("hello")} key = ""/>
    </div>
    <div class="bottomright">
        <Button text="<" onClick={onLeave} key = ""/>
    </div>
    {/if}
</main>

<style>
@import '../app.css';
</style>
