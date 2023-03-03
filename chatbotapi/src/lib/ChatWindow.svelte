<script lang="ts">
	import MessageBox from "./MessageBox.svelte";
	import { onMount } from "svelte";
	export let messages: GptMessage[];
	import { createEventDispatcher } from "svelte";

	let userInput = "";

	// Dispatch Inputs
	let dispatch = createEventDispatcher();
	const sendUserMessage = (msg: string) => {
		dispatch("userMessage", msg);
		userInput = "";
	};

	const trimString = (str: string) => str.replace(/^\s+|\s+$/g, "");

	onMount(() => {
		document.querySelector(".inputBox").addEventListener("keydown", event => {
			//@ts-ignore
			if (event.keyCode == "Enter") {
				event.preventDefault();
				document.forms[0].submit();
			}
		});
	});
</script>

<div class="chat-window">
	<div class="messages-area">
		{#each messages as msg}
			{#if msg.role != "system"}
				<MessageBox {...msg} />
			{/if}
		{/each}
	</div>

	<form
		autocomplete="off"
		class="userinput"
		on:submit|preventDefault={() => sendUserMessage(userInput)}
	>
		<textarea
			class="inputBox"
			bind:value={userInput}
			placeholder="Ask Dan anything..."
		/>
		<button>➤</button>
	</form>
</div>

<style lang="scss">
	$messageFont: Arial, Helvetica, sans-serif;
	$borderColor: rgb(239, 239, 239);

	* {
		box-sizing: border-box;
	}
	.chat-window {
		border-radius: 2px;
		flex: 0 1 1024px;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: stretch;
		border: 1px solid $borderColor;
		overflow: hidden;
	}

	.messages-area {
		font-family: $messageFont;
		flex: 1 1 auto;
		width: 100%;
		padding: 10px;
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
