<script lang="ts">
	import MessageBox from "./ChatBubble.svelte";
	import { onMount } from "svelte";

	export let activeConversation: GptConversation;
	import { createEventDispatcher } from "svelte";

	let userInput = "";
	let submitButton: HTMLButtonElement;

	// Dispatch Inputs
	let dispatch = createEventDispatcher();
	const sendUserMessage = (msg: string) => {
		dispatch("userMessage", msg);
		userInput = "";
	};

	const trimString = (str: string) => str.replace(/^\s+|\s+$/g, "");

	onMount(() => {
		document.querySelector(".inputBox").addEventListener("keypress", event => {
			//@ts-ignore
			if (event.keyCode == 13) {
				event.preventDefault();
				if (userInput){
				submitButton.click();
				}
			}
		});
	});
</script>

<div class="component">
	<div class="messages-area">
		{#each activeConversation.messages as msg}
			{#if msg.role != "system"}
				<MessageBox {...msg} />
			{/if}
		{/each}
	</div>

	<div class="userinput">
		<textarea
			class="inputBox"
			bind:value={userInput}
			placeholder="Ask {activeConversation.character.name} anything..."
		/>
		<button bind:this={submitButton} on:click={() => sendUserMessage(userInput)}>➤</button>
	</div>
</div>

<style lang="scss">
	$messageFont: Arial, Helvetica, sans-serif;
	$borderColor: rgb(118, 109, 109);

	* {
		box-sizing: border-box;
	}
	.component {
		border-radius: 2px;
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 70px;
		align-items: stretch;
		justify-content: stretch;
		border-left: 1px solid $borderColor;
		overflow: hidden;
	}

	.messages-area {
		font-family: $messageFont;
		flex: 0 1 auto;
		width: 100%;
		padding: 10px 15px;
		overflow-y: scroll;
		scrollbar-width: thin;
	}

	.userinput {
		flex: 0 0 70px;
		display: flex;
		align-items: center;
		justify-content: stretch;
		padding: 10px 10px;
		border-top: 1px solid $borderColor;

		.inputBox {
			font-family: $messageFont;
			word-wrap: break-word;
        word-break: break-all;
			border: 1px solid $borderColor;
			outline: none;
			flex: 1 0 auto;
			margin: 2px 5px;
			padding: 5px;
			word-wrap: break-word;
			text-overflow: wrap;
			resize: vertical;
			max-height: 150px;
			min-height: 40px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}

		button {
			width: 50px;
			height: 50px;
			background-color: white;
			border: none;
			outline: 1px solid darkorange;
			font-size: 20px;
			margin: 5px;
			border-radius: 50%;
			padding: 0;
			padding-left: 3px;
			color: darkorange;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

			&:hover {
				transform: scale(1.2);
				opacity: 0.9;
			}
		}
	}
</style>
