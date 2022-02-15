<script lang="ts">
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import Toggle from '$components/Toggle.svelte'
	import SliderInput from '$components/SliderInput.svelte'
	import ColorInput from '$components/ColorInput.svelte'
	import BulbIcon from '$icons/bulb.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
	import { devicesIcons } from '$icons/devicesIcons'
	import { devices } from '$stores/devices'
	import {
		toggle,
		changeColor,
		changeBrightness,
		getEffects,
		changeEffect
	} from '$utils/deviceRequests/index'
	import type { Device } from '$lib/types.d'
	import { DeviceType } from '$lib/types.d'
	import { onMount, onDestroy } from 'svelte'

	const deviceAddress = $page.params.id

	let devicesList: Device[]
	let effectsList: string[]
	let selectedEffect: string

	devices.subscribe((value) => (devicesList = value))
	$: device = devicesList.find((dev) => dev.address === deviceAddress)

	$: if (device && device.type === DeviceType.NANOLEAF) {
		getEffects(device.address).then((res) => (effectsList = res.data))
	}
	$: if (device && device.effect && device.effect !== '*Solid*') {
		selectedEffect = device.effect
	}

	const handleEffectChange = (e) => {
		const effect = e.target.value
		selectedEffect = effect
		changeEffect(effect, device.address)
	}

	onMount(() => document.body.classList.add('no-menu'))
	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('no-menu')
		}
	})
</script>

<svelte:head>
	<title>Device</title>
</svelte:head>

{#if device}
	<section>
		<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

		<h2 class="page-title">{device.name}</h2>

		<div class="device">
			<div class="top-row">
				<ColorInput value={device.color} onChange={(val) => changeColor(val, device, true)} />
				<Toggle checked={device.turnedOn} onChange={(val) => toggle(val, device, true)} />
			</div>

			<div class="icon {device.turnedOn ? 'active' : !device.online ? 'offline' : ''}">
				<svelte:component this={devicesIcons[device.model]} />
			</div>

			<div class="slider">
				<BulbIcon />
				<SliderInput
					value={device.brightness}
					min={1}
					onChange={(val) => changeBrightness(val, device, true)}
				/>
			</div>

			{#if device.type === DeviceType.NANOLEAF && effectsList}
				<div class="effects-select">
					<select value={selectedEffect} on:change={handleEffectChange}>
						{#each effectsList as effect}
							<option value={effect}>{effect}</option>
						{/each}
					</select>
					<ChevronIcon />
				</div>
			{/if}
		</div>
	</section>
{:else}
	<section>
		<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>
		<p class="error">There was a problem fetching this device.</p>
	</section>
{/if}

<style lang="scss">
	section {
		padding: var(--spacing-s);
	}

	.error {
		position: absolute;
		top: 15rem;
		left: 0;
		right: 0;
		font-size: 1.6rem;
		text-align: center;
	}

	.device {
		margin-top: var(--spacing-l);
	}

	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;

		:global(.color-preview) {
			width: 4rem;
			height: 4rem;
		}

		:global(.toggle-switch) {
			width: 4.5rem;
			height: 2.7rem;
		}

		:global(.slider:before) {
			width: 2.7rem;
			height: 2.7rem;
		}

		:global(input:checked + .slider:before) {
			transform: translateX(1.8rem);
		}
	}

	.slider {
		display: flex;
		align-items: center;

		:global(svg) {
			width: auto;
			height: 3.5rem;
			margin-left: var(--spacing-xxxs);
			margin-right: var(--spacing-xs);
		}

		:global(svg path) {
			stroke: var(--color-grey-400);
		}
	}

	.effects-select {
		position: relative;
		margin-top: var(--spacing-s);

		select {
			width: 100%;
			height: 5rem;
			font-size: 1.5rem;
			background: var(--color-black-600);
			color: var(--color-white);
			border: none;
			padding: var(--spacing-xxs) var(--spacing-xs);
			border-radius: var(--main-border-radius);
			outline: none;
			-webkit-appearance: none;
			appearance: none;
		}

		:global(svg) {
			position: absolute;
			width: 1rem;
			height: auto;
			top: 50%;
			right: 2rem;
			transform: translateY(-50%) rotate(-90deg);
		}
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-s) 0;

		:global(svg) {
			width: auto;
			max-width: 85%;
			height: 20rem;
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
