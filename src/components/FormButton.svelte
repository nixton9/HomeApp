<script lang="ts">
	export let text: string
	export let onClick: () => void = () => null
</script>

<button on:click={onClick} class="form-button contrast-hover">{text}</button>

<style lang="scss">
	button {
		color: var(--color-white);
		background-color: var(--color-green);
		font-size: 1.3rem;
		font-weight: var(--font-weight-black);
		letter-spacing: 0.06rem;
		text-transform: uppercase;
		min-width: 15rem;
		padding: var(--spacing-xs);
		border-radius: var(--main-border-radius);
		box-shadow: var(--main-box-shadow);
		cursor: pointer;
	}
</style>
