<script lang="ts">
	import DevicesList from '$components/DevicesList.svelte'
</script>

<svelte:head>
	<title>Devices</title>
</svelte:head>

<section class="page">
	<DevicesList />
</section>

<style lang="scss">
	section {
		padding: var(--spacing-xs);
	}

	.page :global(.devices-list) {
		height: 100%;
	}

	@media screen and (min-width: 600px) {
		.page :global(.device-card) {
			width: calc(33% - 0.85rem);
			min-height: 20rem;
		}
	}

	@media screen and (min-width: 1000px) {
		.page :global(.device-card) {
			width: calc(25% - 1.15rem);
			min-height: 20rem;
		}
	}
</style>
