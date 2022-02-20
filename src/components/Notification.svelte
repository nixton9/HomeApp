<script lang="ts">
	import ErrorIcon from '$icons/error.svelte'
	import SuccessIcon from '$icons/success.svelte'
	import { NotificationTypes } from '$lib/types.d'

	export let text: string
	export let type: NotificationTypes
</script>

<div class="notification">
	{#if type === NotificationTypes.SUCCESS}
		<SuccessIcon />
	{:else}
		<ErrorIcon />
	{/if}
	<p>{text}</p>
</div>

<style lang="scss">
	.notification {
		position: fixed;
		top: 3rem;
		left: 50%;
		width: fit-content;
		max-width: 90%;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 2rem var(--spacing-s);
		background: var(--color-black-600);
		border-radius: var(--main-border-radius);
		box-shadow: var(--big-box-shadow);
		transform: translateX(-50%);
		box-sizing: border-box;
		animation: slideIn 0.5s ease;

		:global(svg) {
			width: auto;
			height: 3.3rem;
			flex-shrink: 0;
		}

		p {
			font-size: 1.4rem;
			line-height: 2.2rem;
		}
	}

	@keyframes slideIn {
		0% {
			transform: translate(-50%, -17rem);
		}
		100% {
			transform: translate(-50%, 0);
		}
	}
</style>
