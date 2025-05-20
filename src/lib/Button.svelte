<script lang="ts">
    export let text: string;
    export let onClick = () => {};
    export let onPointerDown = () => {};
    export let onPointerUp = () => {};
    export let key: string = "";
</script>

<button
    class={"shadow " + key}
    on:click={onClick}
    on:pointerdown={onPointerDown}
    on:pointerup={onPointerUp}
>
    {text}
</button>

<style>
    @import "../app.css";
</style>

