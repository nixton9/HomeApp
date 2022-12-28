<script lang="ts">
	import Toggle from '$components/Toggle.svelte'
	import { devicesIcons } from '$icons/devicesIcons'
	import { toggle } from '$utils/deviceRequests/index'
	import type { Device } from '$lib/types.d'

	export let device: Device
</script>

<div class="device-card card">
	<div class="top-row">
		<h3>{device.turnedOn ? 'On' : 'Off'}</h3>
		<Toggle
			checked={device.turnedOn}
			onChange={(val) => toggle(val, device, true)}
			isDisabled={!device.online}
		/>
	</div>

	<a href="/device/{device.address}">
		<div
			class="icon {!device.online ? 'offline' : !device.turnedOn ? 'turnedOff' : ''}"
			style="color: {device.color ? device.color : ''}"
		>
			<svelte:component this={devicesIcons[device.model]} />
		</div>
	</a>

	<div class="bottom-row">
		<h2>{device.name}</h2>
	</div>
</div>

<style lang="scss">
	.device-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 2rem;
		box-sizing: border-box;
		background: var(--grey-gradient);
	}

	.top-row,
	.bottom-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
	}

	h2 {
		font-size: 1.7rem;
		font-weight: var(--font-weight-semibold);
		margin: 0 auto;

		@media screen and (max-width: 450px) {
			font-size: 1.55rem
		}
	}

	.icon {
		text-align: center;
	}
</style>
