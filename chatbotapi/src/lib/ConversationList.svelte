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
			on:click={() => (activeTab = index)}>{convo.title}</button
		>
	{/each}

	<button
		class="new-conversation"
		on:click={e => createConversation()}
	>
		+ New
	</button>
</div>

<style lang="scss">
	$borderColor: rgb(239, 239, 239);

	.wrapper {
		flex: 0 1 200px;
		display: flex;
		flex-direction: column;
		overflow: auto;
		align-items: stretch;
		justify-content: stretch;
		max-height: 70%;

		.convo-tab,
		.new-conversation {
			flex: 1 1 50px;
			text-align: left;
			padding: 5px 10px;
			text-overflow: ellipsis;
			border: 1px solid rgb(217, 217, 217);
			font-family: Arial, Helvetica, sans-serif;
			transition: all 0.1s ease;
		}

		button.new-conversation {
			background-color: white;
			border-style: dashed;
		}

		.convo-tab.active {
			background-color: rgb(255, 255, 255);
			border-right: 1px solid white;
			margin-right: 1px;
			z-index: 50;
		}
	}
</style>
