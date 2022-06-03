<script lang="ts">
	import DeviceCard from '$components/DeviceCard.svelte'
	import { devices } from '$stores/devices'
	import type { Device } from '$lib/types.d'
	import { sortObjectsArrayByField } from 'nixtons-utils'

	let devicesList: Device[]
	devices.subscribe((value) => (devicesList = value))

	$: sortedDevices = sortObjectsArrayByField(devicesList, 'name') as Device[]
</script>

<div class="devices-list">
	{#if devicesList.length}
		{#each sortedDevices as device}
			<DeviceCard {device} />
		{/each}
	{:else}
		<p class="no-data">There are no devices available right now.</p>
	{/if}
</div>

<style lang="scss">
	.devices-list {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-xs);
	}

	.no-data {
		margin-top: var(--spacing-s);
	}

	:global(.device-card) {
		width: calc(33% - 0.75rem);
		height: calc(33% - 0.75rem);
		min-height: 18rem;
	}

	@media screen and (min-width: 1200px) {
		.devices-list {
			max-height: calc(100vh - 9rem);
			overflow: auto;
			margin-top: 0;
			-ms-overflow-style: none; /* for Internet Explorer, Edge */
			scrollbar-width: none;
		}

		.devices-list::-webkit-scrollbar {
			display: none;
		}

		:global(.device-card) {
			width: calc(50% - 0.75rem);
			min-height: unset;
		}
	}

	@media screen and (max-width: 785px) {
		:global(.device-card) {
			width: calc(50% - 0.75rem);
		}
	}
</style>
