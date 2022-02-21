<script lang="ts">
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import DataFetcher from '$components/DataFetcher.svelte'
	import ColorInput from '$components/ColorInput.svelte'
	import FormButton from '$components/FormButton.svelte'
	import LoadingSpinner from '$components/LoadingSpinner.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
	import EyeIcon from '$icons/eye.svelte'
	import { devices, isLoadingDevices } from '$stores/devices'
	import { modes } from '$stores/modes'
	import { setMessage, setError } from '$stores/notifications'
	import { toggle, changeColor } from '$utils/deviceRequests/index'
	import type { Device, Mode } from '$lib/types.d'
	import { onMount, onDestroy } from 'svelte'
	import { sortObjectsArrayByField, getRandomId } from 'nixtons-utils'

	const modeId = $page.params.mode

	let devicesList: Device[]
	devices.subscribe((devices) => (devicesList = devices.map((dev) => ({ ...dev, color: null }))))
	$: sortedDevices = sortObjectsArrayByField(devicesList, 'name') as Device[]

	let isLoading: boolean
	isLoadingDevices.subscribe((value) => (isLoading = value))

	let modesList: Mode[]
	modes.subscribe((modes) => (modesList = modes))
	$: selectedMode = modeId === '-' ? null : modesList.find((mode) => mode.id === modeId)

	$: pageTitle = selectedMode ? `Edit mode ${selectedMode.name}` : 'Add new mode'
	$: name = selectedMode ? selectedMode.name : ''
	$: devicesColors = selectedMode ? selectedMode.devicesColors : []

	const getDeviceColor = (device: Device): string | null => {
		const deviceColorObj = devicesColors.find((dev) => dev.address === device.address)
		if (deviceColorObj) {
			return deviceColorObj.color
		}
		return null
	}

	const updateDeviceColor = (color: string | null, address: string): void => {
		const device = devicesList.find((dev) => dev.address === address)
		device.color = color
		devicesList = [...devicesList.filter((dev) => dev.address !== address), device]
		devicesColors = color
			? [...devicesColors.filter((dev) => dev.address !== address), { color, address }]
			: devicesColors.filter((dev) => dev.address !== address)
	}

	const handleForm = (): void => {
		if (devicesColors.length === 0) {
			setError('You need to assign at least one device.')
		} else {
			const newMode = {
				id: selectedMode ? selectedMode.id : getRandomId(4),
				name,
				devicesColors
			}
			modes.update((modes) => [
				...(selectedMode ? modes.filter((mode) => mode.id !== selectedMode.id) : modes),
				newMode
			])
			setMessage(`Mode "${name}" was ${selectedMode ? 'updated' : 'created'}`)
			setTimeout(() => goto('/'), 2500)
		}
	}

	const previewMode = async () => {
		await devicesList.forEach((dev) => {
			toggle(false, dev)
		})

		await devicesColors.forEach((deviceColor) => {
			const device = devicesList.find((dev) => dev.address === deviceColor.address)

			if (device) {
				toggle(true, device)
				changeColor(deviceColor.color, device)
			}
		})

		setMessage(`Mode preview on!`)
	}

	onMount(() => document.body.classList.add('no-menu'))
	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('no-menu')
		}
	})
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<DataFetcher />

<section>
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<h2 class="page-title">{pageTitle}</h2>

	{#if isLoading}
		<LoadingSpinner />
	{:else}
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

			<div class="input-group devices-colors">
				{#each sortedDevices as device}
					<div>
						<label for="colorinput">{device.name}</label>
						<div class="device-input-color">
							<ColorInput
								value={getDeviceColor(device)}
								onChange={(val) => updateDeviceColor(val, device.address)}
							/>
							{#if getDeviceColor(device)}
								<span class="delete-color" on:click={() => updateDeviceColor(null, device.address)}
									>+</span
								>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<div class="button-container">
				<button
					type="button"
					class="preview-btn"
					on:click={previewMode}
					disabled={devicesColors.length === 0}
				>
					<EyeIcon />
				</button>
				<FormButton text="Submit" />
			</div>
		</form>
	{/if}
</section>

<style lang="scss">
	section {
		padding: var(--spacing-s);
	}

	:global(.loading) {
		position: absolute !important;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.8rem;
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

	.device-input-color {
		position: relative;
	}

	.delete-color {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		padding: var(--spacing-xxs);
		font-size: 2rem;
		font-weight: var(--font-weight-black);
		z-index: 11;
		cursor: pointer;
	}

	.preview-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-black-600);
		padding: var(--spacing-xs);
		border-radius: var(--main-border-radius);
		box-shadow: var(--main-box-shadow);
		margin-right: var(--spacing-xxs);
		cursor: pointer;

		&:disabled {
			opacity: 0.4;
			cursor: default;
		}
	}
</style>
