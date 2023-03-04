<script lang="ts">
	import { fly } from "svelte/transition";
	import { quadInOut } from "svelte/easing";

	export let content = "";
	export let role = "assistant";
	const trimString = (str: string) => str.replace(/^\s+|\s+$/g, "");
</script>

<!-- {#each trimString(content).split('\n\n') as txt} -->
<div
	transition:fly|local={{ duration: 300, y: 100, easing: quadInOut }}
	class={"message " + role}
>
	{trimString(content)}
</div>
<!-- {/each} -->

<style lang="scss">
	$messageFont: Source Sans Pro, Helvetica, Arial, sans-serif;

	.message {
		font-size: 14px;
		font-family: $messageFont;
		width: fit-content;
		line-height: 18px;
		white-space: pre-line;
		max-width: min(90ch, 90%);
		background-color: rgb(249, 233, 233);
		border-radius: 7px;
		margin-left: auto;
		padding: 12px 15px;
		margin-bottom: 15px;
		margin-right: 10px;
		text-align: left;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px;

		&.assistant {
			font-size: 13px;
			background-color: rgb(255, 239, 222);
			margin-left: 10px;
			margin-right: auto;
			font-family: Source Code Pro, Consolas, monospace;
		}
	}
</style>
