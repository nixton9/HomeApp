<script lang="ts">
	import { onMount } from 'svelte'
	import Greeting from '$components/Greeting.svelte'
	import BigButton from '$components/BigButton.svelte'
	import Tabs from '$components/Tabs.svelte'
	import DevicesList from '$components/DevicesList.svelte'
	import ModesList from '$components/ModesList.svelte'
	import LoadingSpinner from '$components/LoadingSpinner.svelte'
	import TurnOnIcon from '$icons/turnon.svelte'
	import TurnOffIcon from '$icons/turnoff.svelte'
	import { devices } from '$stores/devices'
	import { setMessage } from '$stores/notifications'
	import { shapesDevice } from '$stores/shapes'
	import { toggle } from '$utils/deviceRequests/index'
	import { HomeTabs, Device } from '$lib/types.d'
	import { capitalizeWord } from 'nixtons-utils'

	let shapesAddress: string
	let devicesList: Device[]
	let isLoadingDevices = true

	shapesDevice.subscribe((newDevice) => (shapesAddress = newDevice))

	let activeTab: HomeTabs = HomeTabs.DEVICES
	const homeTabs = Object.keys(HomeTabs).map((tab) => capitalizeWord(tab.toLowerCase()))
	const changeTab = (tab: HomeTabs) => (activeTab = tab.toUpperCase() as HomeTabs)

	onMount(async () => {
		const goveeResponse = await fetch('api/govee')

		const nanoleafResponse = await fetch('/api/nanoleaf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'Shapes',
				ip: shapesAddress
			})
		})

		const goveeData = await goveeResponse.json()
		const nanoleafData = await nanoleafResponse.json()
		const allDevices = [
			...(goveeData.data && goveeData.data),
			...(nanoleafData.data && nanoleafData.data)
		]

		devices.set(allDevices)
		isLoadingDevices = false
	})

	devices.subscribe((value) => (devicesList = value))

	const handleToggleAll = async (state: boolean) => {
		await devicesList.forEach((dev) => toggle(state, dev))
		setMessage(`All devices turned ${state ? 'on' : 'off'}!`)
	}
</script>

<svelte:head>
	<title>Home App</title>
</svelte:head>

<section>
	<Greeting />

	{#if isLoadingDevices}
		<LoadingSpinner />
	{:else}
		<div class="main-buttons">
			<BigButton text="Turn on all" onClick={() => handleToggleAll(true)} accent>
				<TurnOnIcon slot="icon" />
			</BigButton>

			<BigButton text="Turn off all" onClick={() => handleToggleAll(false)}>
				<TurnOffIcon slot="icon" />
			</BigButton>
		</div>

		<Tabs tabs={homeTabs} {activeTab} {changeTab} />

		{#if activeTab === HomeTabs.DEVICES}
			<DevicesList />
		{:else if activeTab === HomeTabs.MODES}
			<ModesList />
		{/if}
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

	.main-buttons {
		display: flex;
		align-items: center;
		gap: var(--spacing-s);
		margin-top: var(--spacing-s);

		:global(.big-button) {
			width: 50%;
		}
	}

	:global(.tabs) {
		margin-top: var(--spacing-s);
	}
</style>
