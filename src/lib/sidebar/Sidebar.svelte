<script>
	export let open = false
</script>

<aside class:open on:click={(e) => open = false}>
	<div class="navtitle">Conversations</div>

	<div class="tabs">
	<slot></slot>
</div>
</aside>

<style>
	aside {
		box-sizing: border-box;
		background-color: rgb(255, 255, 255);
		position: absolute;
		width: 100%;
		height: calc(100vh - 50px);
		left: -100%;
		transition: left 0.3s ease-in-out;
		padding: 15px;
		overflow: auto;
	}

	.navtitle {
		font-size: 20px;
		margin-left: 10px;
		font-weight: bold;
		font: 'Source Sans Pro', Arial, sans-serif;
	}

	.tabs {

	}
	
	.open {
		left: 0
	}

</style>