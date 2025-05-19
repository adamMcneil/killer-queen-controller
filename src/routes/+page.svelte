<script lang="ts">
    import { onMount } from "svelte";
    import Button from "$lib/Button.svelte";
    import InputField from "$lib/InputField.svelte";

    let temp_name:string;
    let name: string = "";

    let x_movement: number = 0;
    let jump: boolean = false;

    let socket: WebSocket;

    let get_game_interval_ms: number = 10;
    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function sendUpdates() {
        await sleep(get_game_interval_ms);
        sendUpdate();
        sendUpdates();
    }


    function onJoin() {
        name = temp_name;
        const ip = window.location.hostname;
        connect(ip);
    }

    function connect(ip: string) {
        socket = new WebSocket("ws://" + ip + ":8000");
        socket.onopen = (e: Event) => {
            console.log(e);
            sendUpdates();
        };
    }

    function leaving() {
        console.log("sent");
        let json = JSON.stringify({
            player: Number(name),
            is_purple: true,
            is_leaving: true,
            x_movement: x_movement,
            jump: jump,
        });
        socket.send(json);
    }

    function sendUpdate() {
        console.log("sent");
        let json = JSON.stringify({
            player: Number(name),
            is_purple: true,
            is_leaving: false,
            x_movement: x_movement,
            jump: jump,
        });
        if (jump) {
            jump = false;
        }
        socket.send(json);
    }
</script>

<main>
    {#if name == ""}
        <InputField bind:value={temp_name} text="enter our name" />
        <Button
            text="Join"
            onPointerDown={() => {
                onJoin();
            }}
            key=""
        />
    {:else}
        <div>
            <Button
                text="<"
                onPointerDown={() => {
                    x_movement = -1;
                }}
                onPointerUp={() => {
                    x_movement = 0;
                }}
                key="arrow"
            />
            <Button
                text=">"
                onPointerDown={() => {
                    x_movement = 1;
                }}
                onPointerUp={() => {
                    x_movement = 0;
                }}
                key="arrow"
            />
            <Button
                text="jump"
                onPointerDown={() => {
                    jump = true;
                }}
                key=""
            />
            <Button
                text="leaving"
                onPointerDown={() => {
                    leaving();
                }}
                key=""
            />
        </div>
    {/if}
</main>

<style>
    @import "../app.css";
</style>
