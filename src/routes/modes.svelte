<script lang="ts">
	import ModesList from '$components/ModesList.svelte'
</script>

<svelte:head>
	<title>Scenes</title>
</svelte:head>

<section class="page">
	<ModesList withTitle={false} withButtons />
</section>

<style lang="scss">
	section {
		padding: var(--spacing-xs);
		max-height: unset;
		box-sizing: border-box;
	}

	.page :global(.modes-list) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		max-height: 100%;
		padding: 0;
	}

	.page :global(.mode-card),
	.page :global(.empty-mode) {
		width: calc(33% - 0.7rem);
	}

	@media screen and (min-width: 1200px) {
		section {
			max-height: calc(100vh - 6rem);
		}

		.page :global(.mode-card),
		.page :global(.empty-mode) {
			width: calc(33% - 0.65rem);
		}
	}

	@media screen and (max-width: 1000px) {
		.page :global(.mode-card),
		.page :global(.empty-mode) {
			width: calc(50% - 0.8rem);
		}
	}

	@media screen and (max-width: 550px) {
		.page :global(.mode-card),
		.page :global(.empty-mode) {
			width: calc(100%);
		}
	}
</style>
