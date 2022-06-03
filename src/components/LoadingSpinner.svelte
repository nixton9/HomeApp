<script lang="ts">
	export let centered: boolean = false
</script>

<div class={centered ? 'loading centered' : 'loading'}>
	<div />
	<div />
	<div />
	<div />
	<div />
	<div />
	<div />
	<div />
	<div />
</div>

<style lang="scss">
	.loading {
		display: inline-block;
		position: relative;
		width: 8em;
		height: 8em;

		&.centered {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 0.8rem;
		}
	}
	.loading div {
		position: absolute;
		width: 1.6em;
		height: 1.6em;
		border-radius: 50%;
		background: var(--color-white);
		animation: glow 1.2s linear infinite;
	}
	.loading div:nth-child(1) {
		top: 0.8em;
		left: 0.8em;
		animation-delay: 0s;
	}
	.loading div:nth-child(2) {
		top: 0.8em;
		left: 3.2em;
		animation-delay: -0.4s;
	}
	.loading div:nth-child(3) {
		top: 0.8em;
		left: 5.6em;
		animation-delay: -0.8s;
	}
	.loading div:nth-child(4) {
		top: 3.2em;
		left: 0.8em;
		animation-delay: -0.4s;
	}
	.loading div:nth-child(5) {
		top: 3.2em;
		left: 3.2em;
		animation-delay: -0.8s;
	}
	.loading div:nth-child(6) {
		top: 3.2em;
		left: 5.6em;
		animation-delay: -1.2s;
	}
	.loading div:nth-child(7) {
		top: 5.6em;
		left: 0.8em;
		animation-delay: -0.8s;
	}
	.loading div:nth-child(8) {
		top: 5.6em;
		left: 3.2em;
		animation-delay: -1.2s;
	}
	.loading div:nth-child(9) {
		top: 5.6em;
		left: 5.6em;
		animation-delay: -1.6s;
	}
	@keyframes glow {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
