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
		width: 100%;
	}

	:global(.device-card) {
		margin: 2rem auto;
		flex: 1;
	}

	@media screen and (min-width: 500px) {
		:global(.device-card) {
			max-width: 34rem;
		}
	}

	.no-data {
		margin-top: var(--spacing-s);
	}
</style>
