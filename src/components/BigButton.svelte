<script lang="ts">
	export let text: string
	export let onClick: () => void = () => null
	export let accent: boolean = false
	export let disabled: boolean = false
	export let formButton: boolean = false
</script>

<button
	on:click={onClick}
	class={accent ? 'accent big-button contrast-hover' : 'big-button contrast-hover'}
	type={formButton ? 'submit' : 'button'}
	{disabled}
>
	<slot name="icon" class="icon" />
	<span>{text}</span>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2.5rem;
		background: var(--grey-gradient);
		border-radius: var(--main-border-radius);
		cursor: pointer;

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&.accent {
			background: var(--color-green);
		}

		:global(svg) {
			margin-right: var(--spacing-xxs);
		}

		span {
			font-size: 1.3rem;
			font-weight: var(--font-weight-black);
			letter-spacing: 0.03rem;
			color: var(--color-white);
			text-transform: uppercase;
		}
	}
</style>
