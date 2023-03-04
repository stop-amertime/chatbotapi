<script lang="ts">
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    const newCharacter = (char: GptCharacter) => {
        dispatch("newCharacter", char)
    }

    export let characters: GptCharacter[];

</script>

<div class="component">
    <h2> Pick a crap GPT: </h2>

    <div class="cards-wrapper"> 
        {#each characters as c}

            <button class="character-card" on:click={(e) => newCharacter(c)}>
                <h2>{c.name}</h2>
                <p>{c.description || "No description listed..."}</p>
            </button>
            
        {/each}
    </div>
</div>

<style lang="scss">

    .component {
        border: 1px solid gray;
        display: flex; 
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
        padding: 20px;
    }

    h2 {

    }

    .cards-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .character-card {
        border: 1px solid rgb(219, 200, 200);
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        margin: 5px;
        border-radius: 5px;
    }


</style>