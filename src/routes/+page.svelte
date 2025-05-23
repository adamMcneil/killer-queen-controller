<script lang="ts">
    import { onMount } from "svelte";
    import Button from "$lib/Button.svelte";
    import InputField from "$lib/InputField.svelte";

    let has_joined: boolean = false;
    let id: number = 0;

    let x_movement: number = 0;
    let jump: boolean = false;
    let diving: boolean = false;

    let socket: WebSocket;

    let get_game_interval_ms: number = 10;
    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async function sendUpdates(is_purple: boolean) {
        await sleep(get_game_interval_ms);
        sendUpdate(is_purple);
        sendUpdates(is_purple);
    }

    function onJoin(is_purple: boolean) {
        id = getRandomInt(1, 10000);
        const ip = window.location.hostname;
        connect(ip, is_purple);
        has_joined = true;
    }

    function connect(ip: string, is_purple: boolean) {
        socket = new WebSocket("ws://" + ip + ":8000");
        socket.onopen = (e: Event) => {
            console.log(e);
            sendUpdates(is_purple);
        };
    }

    function leaving() {
        console.log("sent");
        let json = JSON.stringify({
            player: id,
            is_purple: true,
            is_leaving: true,
            x_movement: x_movement,
            jump: jump,
            diving: diving,
        });
        socket.send(json);
        socket.close();
        has_joined = false;
    }

    function sendUpdate(is_purple: boolean) {
        console.log("sent");
        let json = JSON.stringify({
            player: id,
            is_purple: is_purple,
            is_leaving: false,
            x_movement: x_movement,
            jump: jump,
            diving: diving,
        });
        socket.send(json);
    }
</script>

<main>
    {#if !has_joined}
        <div class="center">
            <Button
                text="Yellow"
                onPointerDown={() => {
                    onJoin(false);
                }}
                key="yellow center"
            />
            <Button
                text="Purple"
                onPointerDown={() => {
                    onJoin(true);
                }}
                key="purple center"
            />
        </div>
    {:else}
        <Button
            text="<"
            onPointerDown={() => {
                x_movement = -1;
            }}
            onPointerUp={() => {
                x_movement = 0;
            }}
            key="button"
        />
        <Button
            text=">"
            onPointerDown={() => {
                x_movement = 1;
            }}
            onPointerUp={() => {
                x_movement = 0;
            }}
            key="button"
        />
        <Button
            text="dive"
            onPointerDown={() => {
                diving = true;
            }}
            onPointerUp={() => {
                diving = false;
            }}
            key="button"
        />
        <Button
            text="jump"
            onPointerDown={() => {
                jump = true;
            }}
            onPointerUp={() => {
                // jump = false;
            }}
            key="button"
        />
        <Button
            text="leave"
            onPointerDown={() => {
                leaving();
            }}
            key="bottomright"
        />
    {/if}
</main>

<style>
    @import "../app.css";
    html {
        margin: 0;
        padding: 0;
        overflow: hidden; /* Disables scrolling */
        height: 100%;
    }
</style>
