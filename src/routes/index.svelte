<script lang="ts">
	import DataFetcher from '$components/DataFetcher.svelte'
	import Greeting from '$components/Greeting.svelte'
	import BigButton from '$components/BigButton.svelte'
	import Tabs from '$components/Tabs.svelte'
	import DevicesList from '$components/DevicesList.svelte'
	import ModesList from '$components/ModesList.svelte'
	import LoadingSpinner from '$components/LoadingSpinner.svelte'
	import TurnOnIcon from '$icons/turnon.svelte'
	import TurnOffIcon from '$icons/turnoff.svelte'
	import { devices, isLoadingDevices } from '$stores/devices'
	import { setMessage } from '$stores/notifications'
	import { toggle } from '$utils/deviceRequests/index'
	import { HomeTabs, Device } from '$lib/types.d'
	import { capitalizeWord } from 'nixtons-utils'

	let devicesList: Device[]
	devices.subscribe((value) => (devicesList = value))

	let isLoading: boolean
	isLoadingDevices.subscribe((value) => (isLoading = value))

	let activeTab: HomeTabs = HomeTabs.DEVICES
	const homeTabs = Object.keys(HomeTabs).map((tab) => capitalizeWord(tab.toLowerCase()))
	const changeTab = (tab: HomeTabs) => (activeTab = tab.toUpperCase() as HomeTabs)

	const handleToggleAll = async (state: boolean) => {
		await devicesList.forEach((dev) => toggle(state, dev))
		setMessage(`All devices turned ${state ? 'on' : 'off'}!`)
	}
</script>

<svelte:head>
	<title>Home App</title>
</svelte:head>

<section>
	<DataFetcher />

	<Greeting />

	{#if isLoading}
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
