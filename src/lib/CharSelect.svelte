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
                <div class="emoji-col">
                    {c?.emoji || "?"}
                </div>
                <div class="text-col">
                <div class="title-row">
                    <div class="name">{c.name}</div>
                    <div class="version">{c.version}</div>
                </div>
                <div class="description">{c.description}</div>
            </div>
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
        font-family: Source Code Pro, Consolas, monospace;
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
        padding: 8px;
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        justify-content: space-between;

        .emoji-col {
            font-size: 25px;
            margin: 10px;
        }

        .text-col {
            display: flex; 
            flex-direction: column;
            text-align: left;

            .title-row {
                margin: 2px 10px;
                font-weight: 600;
                display: flex;
                align-items: center;
                font-family: 'Source Code Pro', 'Consolas', monospace;
                
                .name{ 
                    font-size: 20px;
                    margin-right: 10px;
                    font-family: 'Source Code Pro', 'Consolas', monospace;
                }

                .version {
                    font-size: 12px;
                    color: gray;
                    padding: 2px 4px;
                    border: 1px solid rgb(214, 214, 214); 
                    border-radius: 10px;
                }
            }

            .description {
                font-family: 'Source Code Pro', 'Consolas', monospace;
                margin: 2px 10px 10px;
                max-width: 60ch;

            }

        }
    }


</style>