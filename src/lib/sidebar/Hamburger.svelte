<script>
	export let open = false
</script>

<button class:open on:click={() => open = !open}>
	<svg width=32 height=24>
		<line id="top" x1=0 y1=2  x2=32 y2=2/>
		<line id="middle" x1=0 y1=10 x2=20 y2=10/>
		<line id="bottom" x1=0 y1=18 x2=32 y2=18/>
	</svg>
</button>

<style lang="scss">
	svg {
		min-height: 24px;
		transition: transform 0.3s ease-in-out;
	}

	
	svg line {
		stroke: white;
		stroke-width: 2;
		transition: transform 0.3s ease-in-out
	}
	
	button {
		z-index: 20;
		cursor: pointer;
		outline: none;
		border: none;
		background-color: darkorange;
		border-right: 1px solid gray;
		padding-left: 15px;
		padding-top: 10px;
		padding-right: 15px;

		&.open {
			filter: brightness(0.8);
		}
	}
	
	.open svg {
		transform: scale(0.7)
	}
	
	.open #top {
		transform: translate(6px, 0px) rotate(45deg)
	}
	
	.open #middle {
		opacity: 0;
	}
	
  .open #bottom {
		transform: translate(-9px, 10px) rotate(-45deg)
	}
</style>