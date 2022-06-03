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
		right: 3rem;
		max-width: 42rem;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: var(--spacing-s);
		background: var(--color-black);
		border-radius: var(--main-border-radius);
		box-shadow: var(--big-box-shadow);
		box-sizing: border-box;
		animation: slideIn 0.5s ease;

		:global(svg) {
			width: auto;
			height: 4rem;
			flex-shrink: 0;
		}

		p {
			font-size: 1.4rem;
			line-height: 2.4rem;
		}
	}

	@keyframes slideIn {
		0% {
			transform: translateY(-17rem);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
