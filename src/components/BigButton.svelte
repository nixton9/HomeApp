<script lang="ts">
	export let text: string
	export let onClick: () => void
	export let accent: boolean = false
</script>

<button on:click={onClick} class={accent ? 'accent big-button' : 'big-button'}>
	<slot name="icon" />
	<span>{text}</span>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 2.5rem;
		background: var(--color-black-600);
		box-shadow: var(--main-box-shadow);
		border-radius: var(--main-border-radius);
		cursor: pointer;

		&.accent {
			background: var(--color-green);
		}

		span {
			font-size: 1.3rem;
			font-weight: var(--font-weight-black);
			letter-spacing: 0.03rem;
			color: var(--color-white);
			text-transform: uppercase;
			margin-top: var(--spacing-xxs);
		}
	}
</style>
