<script lang="ts">
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();
	const createConversation = () => dispatch("createConversation");
	const randomfn = () => dispatch("randomfn");
	export let conversations: GptConversation[];
	export let activeTab = 0;
</script>

<div class="wrapper">
	{#each conversations as convo, index}
		<button
			class="convo-tab"
			class:active={activeTab == index}
			contenteditable
			bind:innerHTML={convo.title}
			on:click={() => (activeTab = index)}
		></button>
	{/each}

	<button
		class="new-conversation"
		on:click={e => createConversation()}
	>
		+ New
	</button>
</div>

<style lang="scss">
	$borderColor: rgb(141, 130, 130);

	.wrapper {
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		align-items: stretch;
		justify-content: stretch;

		.convo-tab,
		.new-conversation {
			flex: 0 1 50px;
			color: rgb(82, 79, 79);
			background-color:rgb(238, 238, 238);
			text-align: left;
			padding: 5px 10px;
			text-overflow: ellipsis;
			border: 1px solid rgb(217, 217, 217);
			font-family: Arial, Helvetica, sans-serif;
			transition: all 0.2s ease;

			&:hover {
				filter: brightness(1.05);
			}
		}

		button.new-conversation {
			background-color: white;
			border-style: dashed;
		}

		.convo-tab.active {
			background-color: rgb(255, 255, 255);
			z-index: 50;
			font-weight: bold;
			border-right: none;
			cursor: text;
		}
	}
</style>
