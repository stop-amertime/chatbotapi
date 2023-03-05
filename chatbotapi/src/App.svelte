<script lang="ts">
	import ChatWindow from "./lib/ChatWindow.svelte";
	import { onMount } from "svelte";
	import { prompts } from "../public/prompts";
	import { writable } from "svelte/store";
	import { getChatCompletion } from "./lib/openaiAdapter";
	import TabList from "./lib/TabList.svelte";
    import CharSelect from "./lib/CharSelect.svelte";
	import Sidebar from "./lib/sidebar/Sidebar.svelte";
	import Hamburger from './lib/sidebar/Hamburger.svelte';

	/* -------------------------------------------------------------------------- */

	let conversationNumber = 0; 
	let pageWidth = 1024;
	$: useMobileLayout = pageWidth < 800;
	let isSidebarOpen = false; 

	// Default prompt
	const defaultCharacter: GptCharacter = prompts[3];
	const characters: GptCharacter[] = prompts;
	const makeDefaultConversation = (title: string = "...Untitled") => {
		return {
			title,
			character: defaultCharacter,
			messages: [{ role: "system", content: defaultCharacter.prompt }],
		};
	};

	const makeBlankConversation = (title: string = "...Untitled") => {
		return {
			title,
			character: null,
			messages: null,
		};
	};

	// Load past conversations.
	const load_string = localStorage.getItem("conversations");
	let conversations = load_string
		? JSON.parse(load_string)
		: [makeDefaultConversation()];
	let activeTab = 0;

	conversations = conversations.filter(c => (c!=null && c.character!=null && c.title!=null));

	function createConversation() {
		localStorage.setItem("conversations", JSON.stringify(conversations));
		conversations = [...conversations, makeBlankConversation()];
		activeTab = conversations.length - 1;
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

		conversations[activeTab].messages = [
			...conversations[activeTab].messages,
			{ role: "user", content: newMessage },
		];
		userPrompt = "";

		//@ts-ignore
		getChatCompletion(newMessage, conversations[activeTab].messages).then(resp => {
			conversations[activeTab].messages = resp.messages;
			saveConversations();
		});

		localStorage.setItem("conversations", JSON.stringify(conversations));

	};

	const reset = () => {
		conversations[activeTab].messages = [
			{ role: "system", content: defaultCharacter.prompt },
		];
	};

	const saveConversations = () =>
		localStorage.setItem("conversations", JSON.stringify(conversations));

	function initConversation (char: GptCharacter) {
		conversations[activeTab] = {
			title: char.name + " " + conversationNumber++,
			character: char,
			messages: [{ role: "system", content: char.prompt }],
		};
	}
</script>

<div class="page" bind:clientWidth={pageWidth}>

	

	<nav>
		{#if useMobileLayout}
		<Hamburger bind:open={isSidebarOpen}/>
		{/if}
		<h1 class="title">Crap<b>GPT</b></h1>
	</nav>

	<div class="main">
			
		{#if useMobileLayout}
		<Sidebar bind:open={isSidebarOpen}>
			<TabList
					on:createConversation={e => createConversation()}
					on:randomfn={e => reset()}
					bind:activeTab
					{conversations}
				/>
		</Sidebar>
		{:else}
			<TabList
				on:createConversation={e => createConversation()}
				on:randomfn={e => reset()}
				bind:activeTab
				{conversations}
			/>
		{/if}

		{#if !conversations[activeTab]?.character}
			<CharSelect {characters} on:newCharacter={(e) => initConversation(e.detail)}/>
		{:else}
			<ChatWindow
				activeConversation={conversations[activeTab]}
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
		font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
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
		border-bottom: 1px solid rgb(148, 81, 0);
		display: flex;


		h1 {
			width: 100%;
			color: darkorange;
			font-family: 'Source Code Pro',"Consolas", monospace;
			font-weight: bold;
			font-size: 30px;
			padding: 0px;
			margin: 0px;
			margin-left: 50px;
			color: rgb(255, 255, 255);
		}


	}

	.main {
		width: 100%;
		height: 100%;
		overflow: auto;
		display: grid;
		flex-direction: row;
		grid-template-columns: 150px 1fr; 
		align-items: stretch;
		justify-content: stretch;

		@media(max-width: 800px) {
			grid-template-columns: 1fr;
		}
	}

</style>
