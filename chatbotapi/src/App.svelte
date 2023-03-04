<script lang="ts">
	import ChatWindow from "./lib/ChatWindow.svelte";
	import { onMount } from "svelte";
	import { prompts } from "../public/prompts";
	import { writable } from "svelte/store";
	import { getChatCompletion } from "./lib/openaiAdapter";
	import ConversationList from "./lib/TabList.svelte";
    import CharSelect from "./lib/CharSelect.svelte";
	const activePrompt = prompts[4].prompt;

	/* -------------------------------------------------------------------------- */

	let conversationNumber = 0; 
	// Default prompt
	const defaultCharacter: GptCharacter = prompts[4];
	const characters: GptCharacter[] = prompts;
	const makeDefaultConversation = (title: string = "...Untitled") => {
		return {
			title,
			character: defaultCharacter,
			messages: [{ role: "system", content: defaultCharacter.prompt }],
		};
	};

	// Load past conversations.
	const load_string = localStorage.getItem("conversations");
	let conversations = load_string
		? JSON.parse(load_string)
		: [makeDefaultConversation()];
	let activeTab = 0;
	$: activeConversation = conversations[activeTab];

	function createConversation() {
		localStorage.setItem("conversations", JSON.stringify(conversations));
		conversations = [...conversations, null];
	}
	const changeTab = (tabNumber: number) => {
		activeTab = tabNumber;
	};

	let params = {
		model: "gpt-3.5-turbo",
		temperature: 0.8,
	};
	let userPrompt = "";

	const askGPT = (newMessage: string) => {

		activeConversation.messages = [
			...activeConversation.messages,
			{ role: "user", content: newMessage },
		];
		userPrompt = "";

		//@ts-ignore
		getChatCompletion(newMessage, activeConversation.messages).then(resp => {
			activeConversation.messages = resp.messages;
			saveConversations();
		});
	};

	const reset = () => {
		activeConversation.messages = [
			{ role: "system", content: defaultCharacter.prompt },
		];
	};

	const saveConversations = () =>
		localStorage.setItem("conversations", JSON.stringify(conversations));

	function initConversation (char: GptCharacter) {
		activeConversation = {
			title: char.name + " " + conversationNumber++,
			character: char,
			messages: [{ role: "system", content: char.prompt }],
		};
	}
</script>

<div class="page">
	<nav>
		<h1 class="title">Chat<b>PCP</b></h1>
	</nav>

	<div class="content">
		<ConversationList
			on:createConversation={e => createConversation()}
			on:randomfn={e => reset()}
			bind:activeTab
			{conversations}
		/>

			{#if !activeConversation}
			<CharSelect {characters} on:newCharacter={(e) => initConversation(e.detail)}/>
			{:else}
			<ChatWindow
				{activeConversation}
				on:userMessage={event => askGPT(event.detail)}
			/>
			{/if}
	</div>
</div>

<style lang="scss">
	* {
		box-sizing: border-box;
		@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,700&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap');
	}

	:global(*) {
		font-family: Source Sans Pro, Helvetica, Arial, sans-serif;
	}
	$borderColor: rgb(239, 239, 239);

	.page {
		width: 100vw;
		height: 100vh;
		max-height: 100vh;
		margin: 0;
		padding: 0;
		overflow: hidden;
		display: grid;
		grid-template-rows: 40px calc(100vh - 40px);
		align-items: stretch;
		justify-content: stretch;
	}

	nav {
		background-color: rgb(215, 152, 89);

		h1 {
			width: 100%;
			color: darkorange;
			font-family: "Consolas", monospace;
			font-weight: bold;
			font-size: 36px;
			padding: 0px;
			margin: 0px;
			margin-left: 50px;
			color: rgb(255, 255, 255);
		}
	}

	.content {
		padding: 15px;
		width: 100%;
		height: 100%;
		display: grid;
		flex-direction: row;
		grid-template-columns: 100px 1fr; 
		align-items: stretch;
		justify-content: stretch;
	}

	
</style>
