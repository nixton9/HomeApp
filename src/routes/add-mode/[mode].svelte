<script lang="ts">
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import DataFetcher from '$components/DataFetcher.svelte'
	import ColorInput from '$components/ColorInput.svelte'
	import BigButton from '$components/BigButton.svelte'
	import LoadingSpinner from '$components/LoadingSpinner.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
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

	$: pageTitle = selectedMode ? `Edit scene ${selectedMode.name}` : 'Create new scene'
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

<section class="page">
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<div class="page-content">
		<h2 class="page-title">{pageTitle}</h2>

		{#if isLoading}
			<LoadingSpinner centered />
		{:else}
			<form on:submit|preventDefault={handleForm} class="styled-form page-content-flex">
				<div class="left">
					<div class="input-group">
						<input
							id="modenameinput"
							class="input"
							bind:value={name}
							placeholder="Write a name for the scene"
							required
						/>
					</div>
				</div>

				<div class="right">
					<div class="devices-colors">
						{#each sortedDevices as device}
							<div class="device-color">
								<label for="colorinput">{device.name}</label>

								<ColorInput
									value={getDeviceColor(device)}
									onChange={(val) => updateDeviceColor(val, device.address)}
								/>

								<div
									class={getDeviceColor(device) ? 'delete' : 'delete disabled'}
									on:click={() => updateDeviceColor(null, device.address)}
								>
									<span>+</span>
								</div>
							</div>
						{/each}
					</div>

					<div class="buttons">
						<BigButton text="Preview" onClick={previewMode} disabled={devicesColors.length === 0} />
						<BigButton text="Create Scene" accent formButton />
					</div>
				</div>
			</form>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		padding: var(--spacing-s);
		min-height: 80vh;
	}

	.styled-form {
		margin-top: var(--spacing-m);

		.input-group input {
			margin-top: 0;
		}
	}

	.devices-colors {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		place-items: center;
		gap: var(--spacing-xs);
	}

	.device-color {
		position: relative;
		width: 14rem;
		height: 14rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xs);
		background: var(--grey-gradient);
		border-radius: var(--main-border-radius);
		box-sizing: border-box;

		label {
			position: absolute;
			top: 1.75rem;
			font-size: 1.2rem;
			line-height: 1;
			font-weight: var(--font-weight-medium);
		}

		:global(.color-preview) {
			width: 5rem;
			height: 5rem;
		}
	}

	.delete {
		position: absolute;
		bottom: 1rem;
		&.disabled {
			opacity: 0.2;
			pointer-events: none;
		}

		span {
			display: block;
			font-size: 1.9rem;
			line-height: 1;
			font-weight: var(--font-weight-medium);
			transform: rotate(45deg);
		}
	}

	.buttons {
		width: 100%;
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-m);

		:global(.big-button) {
			width: 50%;
		}
	}

	@media screen and (max-width: 1200px) {
		.page-title {
			text-align: center;
		}

		.styled-form {
			max-width: 61rem;
			margin: var(--spacing-m) auto;
		}

		.input {
			margin: 0 auto;
		}

		.right :global(.devices-colors) {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			margin-top: var(--spacing-m);
		}
	}

	@media screen and (min-width: 1200px) {
		.styled-form {
			justify-content: space-between;
		}
	}
</style>
