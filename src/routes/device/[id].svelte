<script lang="ts">
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import Toggle from '$components/Toggle.svelte'
	import SliderInput from '$components/SliderInput.svelte'
	import ColorInput from '$components/ColorInput.svelte'
	import BulbIcon from '$icons/bulb.svelte'
	import TemperatureIcon from '$icons/temperature.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
	import { devicesIcons } from '$icons/devicesIcons'
	import { devices } from '$stores/devices'
	import {
		toggle,
		changeColor,
		changeBrightness,
		changeColorTemperature,
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

	/* 	devices.subscribe((value) => (devicesList = value))
	$: device = devicesList.find((dev) => dev.address === deviceAddress) */

	/* APAGAR */
	const device = {
		address: '1929',
		name: 'Wall Light',
		model: 'H6054',
		online: false,
		turnedOn: false,
		brightness: 100,
		color: 'rgb(255,255,255)',
		type: 'govee'
	}
	/* APAGAR */

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

<section class="page">
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<div class="page-content page-content-flex">
		{#if device}
			<h2 class="page-title">{device.name}</h2>

			<div class="device">
				<div class="first-card card">
					<div
						class="icon {!device.online ? 'offline' : !device.turnedOn ? 'turnedOff' : ''}"
						style="color: {device.color ? device.color : ''}"
					>
						<svelte:component this={devicesIcons[device.model]} />
					</div>

					<Toggle checked={device.turnedOn} onChange={(val) => toggle(val, device, true)} />
				</div>

				<div class="row">
					<div class="card slider-card">
						<div class="slider">
							<BulbIcon />
							<SliderInput
								value={device.brightness}
								min={1}
								onChange={(val) => changeBrightness(val, device, true)}
							/>
						</div>
					</div>

					<div class="card color-card">
						<ColorInput value={device.color} onChange={(val) => changeColor(val, device, true)} />
					</div>

					{#if device.type === DeviceType.YEELIGHT}
						<div class="card slider-card">
							<div class="slider">
								<TemperatureIcon />
								<SliderInput
									value={device.colorTemperature}
									min={1700}
									max={6500}
									onChange={(val) => changeColorTemperature(val, device, true)}
								/>
							</div>
						</div>
					{/if}

					{#if device.type === DeviceType.NANOLEAF && effectsList}
						<div class="card select-card">
							<div class="effects-select">
								<select value={selectedEffect} on:change={handleEffectChange}>
									{#each effectsList as effect}
										<option value={effect}>{effect}</option>
									{/each}
								</select>
								<ChevronIcon />
							</div>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<p class="error">There was a problem fetching this device.</p>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		padding-top: var(--spacing-s);
	}

	.page-title {
		width: 100%;
		padding: 0 var(--spacing-l);
		text-align: center;
		white-space: nowrap;
		box-sizing: border-box;
	}

	.device {
		width: 100%;
		margin-top: var(--spacing-s);
		box-sizing: border-box;
	}

	.card {
		background: var(--grey-gradient);
		padding: var(--spacing-s);
		box-sizing: border-box;
		text-align: center;
	}

	.first-card {
		padding-top: var(--spacing-m);
		padding-bottom: var(--spacing-m);

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;

			:global(svg) {
				width: auto;
				max-width: 60%;
				height: 15rem;
			}
		}

		:global(.toggle) {
			margin-top: var(--spacing-s);
		}
	}

	.row {
		display: flex;
		align-items: stretch;
		justify-content: center;
		gap: 0 var(--spacing-xs);
		margin-top: var(--spacing-xs);

		.slider-card,
		.select-card {
			width: 42%;
		}

		.color-card {
			width: 16%;
			padding: 2rem;
		}

		.select-card {
			padding: 0;
		}

		.card {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.slider {
		display: flex;
		align-items: center;

		:global(svg) {
			height: 3rem;
			width: auto;
			color: var(--color-grey);
			margin-right: var(--spacing-xs);
		}
	}

	.effects-select {
		position: relative;

		select {
			width: 100%;
			font-size: 1.5rem;
			color: var(--color-white);
			padding: var(--spacing-s) 5rem var(--spacing-s) var(--spacing-s);
			background: none;
			border: none;
			outline: none;
			-webkit-appearance: none;
			appearance: none;
		}

		:global(svg) {
			position: absolute;
			width: 1rem;
			height: auto;
			top: 50%;
			right: 3rem;
			transform: translateY(-50%) rotate(-90deg);
		}
	}

	.error {
		position: absolute;
		top: 15rem;
		left: 0;
		right: 0;
		font-size: 1.6rem;
		text-align: center;
	}

	@media screen and (min-width: 1200px) {
		section {
			padding: var(--spacing-s);
		}

		.page-title {
			text-align: center;
			padding: 0;
			width: unset;
		}

		.device {
			margin-top: 0;
		}
	}

	@media screen and (max-width: 800px) {
		.page-title {
			padding: 0;
		}
	}

	@media screen and (max-width: 475px) {
		.row {
			flex-direction: column;
			gap: var(--spacing-xs);

			.card {
				width: 100%;

				&.color-card {
					order: -1;
				}
			}
		}
	}
</style>
