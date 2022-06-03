<script lang="ts">
	import ModeCard from '$components/ModeCard.svelte'
	import PlusIcon from '$icons/plus.svelte'
	import MenuIcon from '$components/icons/menu.svelte'
	import { modes } from '$stores/modes'
	import { devices } from '$stores/devices'
	import { setMessage } from '$stores/notifications'
	import { toggle, changeColor } from '$utils/deviceRequests/index'
	import type { Mode, Device } from '$lib/types.d'

	export let withTitle: boolean = true
	export let withButtons: boolean = false

	let modesList: Mode[]
	modes.subscribe((value) => (modesList = value))

	let devicesList: Device[]
	devices.subscribe((value) => (devicesList = value))

	const getActiveMode = () =>
		modesList.find((mode) => {
			const devicesInMode = mode.devicesColors.map((dev) => dev.address)

			const devicesNotInMode = devicesList.filter(
				(device) => !devicesInMode.includes(device.address)
			)

			if (!devicesNotInMode.every((device) => !device.turnedOn)) return null

			return mode.devicesColors.every((dev) => {
				const device = devicesList.find((device) => device.address === dev.address)
				return device && device.turnedOn && device.color === dev.color
			})
		})

	$: activeMode = devicesList && getActiveMode() && getActiveMode().id

	const handleModeClick = async (mode: Mode) => {
		await devicesList.forEach((dev) => {
			toggle(false, dev)
		})

		await mode.devicesColors.forEach((deviceColor) => {
			const device = devicesList.find((dev) => dev.address === deviceColor.address)

			if (device) {
				toggle(true, device)
				changeColor(deviceColor.color, device)
			}
		})

		setMessage(`Mode '${mode.name}' activated!'`)
	}

	const handleModeDelete = (id: string) => {
		if (confirm('Are you sure you want to delete this mode?')) {
			const newModes = modesList.filter((mode) => mode.id !== id)
			modes.set(newModes)
		}
	}
</script>

{#if withTitle}
	<div class="header">
		<h2 class="card-title">Your Scenes</h2>

		<a href="/modes"><MenuIcon /></a>
	</div>
{/if}

<div class="modes-list">
	{#each modesList as mode}
		<ModeCard
			{mode}
			{withButtons}
			isActive={activeMode === mode.id}
			onClick={handleModeClick}
			onDelete={handleModeDelete}
		/>
	{/each}

	<a href="/add-mode/-" class="empty-mode">
		<PlusIcon />
	</a>
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--spacing-s);
	}

	.header a {
		display: inherit;
	}

	.modes-list {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xs);
		max-height: 93%;
		padding: var(--spacing-s);
		overflow: auto;
	}

	.empty-mode {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 14rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-grey);
		border-radius: var(--main-border-radius);
		background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%2372788AFF' stroke-width='7' stroke-dasharray='15' stroke-dashoffset='10' stroke-linecap='round'/%3e%3c/svg%3e");
		cursor: pointer;
		box-sizing: border-box;

		:global(svg) {
			width: auto;
			height: 2.2rem;
		}
	}
</style>
