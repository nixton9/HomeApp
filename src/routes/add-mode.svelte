<script lang="ts">
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import ColorInput from '$components/ColorInput.svelte'
	import FormButton from '$components/FormButton.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
	import { devices } from '$stores/devices'
	import { modes } from '$stores/modes'
	import { setMessage, setError } from '$stores/notifications'
	import type { Device } from '$lib/types.d'
	import { onMount, onDestroy } from 'svelte'
	import { sortObjectsArrayByField } from 'nixtons-utils'

	let name: string = ''
	let modeColor: string = '#ffffff'
	let devicesColors: { address: string; color: string }[] = []

	let devicesList: Device[]
	devices.subscribe((devices) => (devicesList = devices.map((dev) => ({ ...dev, color: null }))))
	$: sortedDevices = sortObjectsArrayByField(devicesList, 'name') as Device[]

	const handleForm = () => {
		if (devicesColors.length === 0) {
			setError('You need to assign at least one device.')
		} else {
			const newMode = {
				name,
				color: modeColor,
				devicesColors
			}
			modes.update((modes) => [...modes, newMode])
			setMessage(`New mode "${name}" was created`)
			setTimeout(() => goto('/'), 2500)
		}
	}

	const updateDeviceColor = (color: string, address: string) => {
		const device = devicesList.find((dev) => dev.address === address)
		device.color = color
		devicesList = [...devicesList.filter((dev) => dev.address !== address), device]

		if (!devicesColors.find((dev) => dev.address === address)) {
			devicesColors.push({ color, address })
		}
	}

	onMount(() => document.body.classList.add('no-menu'))
	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('no-menu')
		}
	})
</script>

<svelte:head>
	<title>Add mode</title>
</svelte:head>

<section>
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<h2 class="page-title">Add new mode</h2>

	<form on:submit|preventDefault={handleForm} class="styled-form">
		<div class="input-group">
			<label for="modenameinput">Mode name</label>
			<input
				id="modenameinput"
				class="input"
				bind:value={name}
				placeholder="Write a name"
				required
			/>
		</div>

		<div class="input-group">
			<label for="colorinput">Mode color</label>
			<ColorInput value={modeColor} onChange={(val) => (modeColor = val)} isFullWidth />
		</div>

		<div class="input-group devices-colors">
			{#each sortedDevices as device}
				<div>
					<label for="colorinput">{device.name}</label>
					<div class="device-input-color">
						<ColorInput
							value={device.color}
							onChange={(val) => updateDeviceColor(val, device.address)}
						/>
					</div>
				</div>
			{/each}
		</div>

		<div class="button-container">
			<FormButton text="Submit" />
		</div>
	</form>
</section>

<style lang="scss">
	section {
		padding: var(--spacing-s);
	}

	.devices-colors {
		display: grid;
		grid-template-columns: 1fr 1fr;
		place-items: center;
		gap: var(--spacing-m) 0;
	}

	:global(.color-preview) {
		margin-top: var(--spacing-xs);
	}

	:global(.color-preview:not(.full-width)) {
		width: 4rem !important;
		height: 4rem !important;
		margin: var(--spacing-xs) auto 0 auto;
	}
</style>
