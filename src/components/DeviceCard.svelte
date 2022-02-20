<script lang="ts">
	import Toggle from '$components/Toggle.svelte'
	import SliderInput from '$components/SliderInput.svelte'
	import ColorInput from '$components/ColorInput.svelte'
	import BulbIcon from '$icons/bulb.svelte'
	import { devicesIcons } from '$icons/devicesIcons'
	import { toggle, changeColor, changeBrightness } from '$utils/deviceRequests/index'
	import type { Device } from '$lib/types.d'

	export let device: Device
</script>

<div class="device-card">
	<div class="top-row">
		<h3>{device.name}</h3>
		<Toggle
			checked={device.turnedOn}
			onChange={(val) => toggle(val, device, true)}
			isDisabled={!device.online}
		/>
	</div>

	<a href="/device/{device.address}">
		<div class="icon {device.turnedOn ? 'active' : !device.online ? 'offline' : ''}">
			<svelte:component this={devicesIcons[device.model]} />
		</div>
	</a>

	<div class="bottom-row">
		<div class="slider">
			<BulbIcon />
			<SliderInput
				value={device.brightness}
				min={1}
				onChange={(val) => changeBrightness(val, device)}
				isDisabled={!device.online}
			/>
		</div>
		<ColorInput
			value={device.color}
			onChange={(val) => changeColor(val, device)}
			isDisabled={!device.online}
		/>
	</div>
</div>

<style lang="scss">
	.device-card {
		padding: 2rem;
		background: var(--color-black-600);
		border-radius: var(--main-border-radius);
		box-shadow: var(--main-box-shadow);
	}

	.top-row,
	.bottom-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h3 {
		font-size: 1.5rem;
		font-weight: var(--font-weight-black);
	}

	.slider {
		width: 75%;
		display: flex;
		align-items: center;

		:global(svg) {
			width: auto;
			height: 2.5rem;
			margin-right: var(--spacing-xs);
		}

		:global(svg path) {
			stroke: var(--color-grey-400);
		}
	}

	.icon {
		position: relative;
		min-height: 8rem;

		:global(svg) {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		:global(svg.shapes) {
			top: 45%;
		}

		:global(svg path),
		:global(svg rect) {
			fill: var(--color-grey-600);
		}

		:global(svg.leds rect:not(:first-child)) {
			fill: var(--color-grey-400);
		}

		&.offline {
			:global(svg path),
			:global(svg rect) {
				fill: var(--color-black-800);
			}

			:global(svg.leds rect:not(:first-child)) {
				fill: var(--color-black-400);
			}
		}

		&.active {
			:global(svg path),
			:global(svg rect) {
				fill: var(--color-green);
			}

			:global(svg.leds rect:first-child) {
				fill: var(--color-white);
			}
			:global(svg.leds rect:not(:first-child)) {
				fill: var(--color-green);
			}
		}
	}
</style>
