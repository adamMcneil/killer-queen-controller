<script lang="ts">
import {
    onMount
} from 'svelte';
import Button from "$lib/Button.svelte";
import InputField from '$lib/InputField.svelte';
  import { control } from '$lib/requests';

let name: string;
let game_state: string;
let ip: string;
let valid_states: Set<string> = new Set<string>(["join", "controller"]);

let right = "Right";
let left = "Left";
let endRight= "EndRight";
let endLeft= "EndLeft";
let join = "Join";
let jump = "Jump";
let dive = "Dive";

let socket: WebSocket;

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
    if (localStorage.getItem("game_state")) {
        socket = new WebSocket("ws://" + localStorage.getItem("ip"));
    }
});

function onConnect() {
    if (localStorage.getItem("ip")) {
        socket = new WebSocket("ws://" + localStorage.getItem("ip"));
    }
}

function onJoin() {
    game_state = "controller"
    localStorage.setItem('game_state', game_state);
    localStorage.setItem('name', name);
    localStorage.setItem('ip', ip);
    sendAction(join);
}

function onLeave() {
    game_state = "join"
    localStorage.setItem('game_state', game_state);
}

function sendAction(action: string) {
    let json = JSON.stringify({
        player: localStorage.getItem("name"),
        movement: action,
        time: 1  
    })
    socket.send(json)
}

</script>

<main>
    {#if game_state == "join"}
    <div>
	    <InputField bind:value={ip} text="enter the ip address" />
	    <InputField bind:value={name} text="enter our name" />
    </div>
    <div>
        <Button text="Join" onClick={onJoin} key = ""/>
        <Button text="Connect" onClick={onConnect} key = ""/>
    </div>
    {:else}
    <div>
        <Button text="<" onPointerDown={() => sendAction(left)} onPointerUp = {() => sendAction(endLeft)} key = "arrow"/>
        <Button text=">" onPointerDown={() => sendAction(right)} onPointerUp = {() => sendAction(endRight)} key = "arrow"/>
        <Button text="jump" onPointerDown={() => sendAction(jump)} key = ""/>
        <Button text="dive" onPointerDown={() => sendAction(dive)} key = ""/>
    </div>
    <div class="bottomright">
        <Button text="<" onClick={onLeave} key = ""/>
    </div>
    {/if}
</main>

<style>
@import '../app.css';
</style>
