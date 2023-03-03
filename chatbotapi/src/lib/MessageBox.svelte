<script lang="ts">
	import { fly } from "svelte/transition";
	import { quadInOut } from "svelte/easing";

	export let content = "";
	export let role = "assistant";
	const trimString = (str: string) => str.replace(/^\s+|\s+$/g, "");
</script>

<div
	transition:fly|local={{ duration: 300, y: 100, easing: quadInOut }}
	class={"message " + role}
>
	{trimString(content)}
</div>

<style lang="scss">
	$messageFont: Arial, Helvetica, sans-serif;

	.message {
		width: fit-content;
		white-space: pre-line;
		max-width: min(90ch, 90%);
		background-color: rgb(255, 255, 255);
		border-radius: 7px;
		margin-left: auto;
		padding: 12px 15px;
		margin-bottom: 10px;
		margin-right: 10px;
		text-align: left;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

		&.assistant {
			background-color: rgb(255, 239, 222);
			margin-left: 10px;
			margin-right: auto;
			font-family: monospace;
			font-weight: bold;
		}
	}
</style>
