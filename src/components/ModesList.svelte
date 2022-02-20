<script lang="ts">
	import ModeCard from '$components/ModeCard.svelte'
	import PlusIcon from '$icons/plus.svelte'
	import { modes } from '$stores/modes'
	import { devices } from '$stores/devices'
	import { setMessage } from '$stores/notifications'
	import { toggle, changeColor } from '$utils/deviceRequests/index'
	import type { Mode, Device } from '$lib/types.d'

	let modesList: Mode[]
	modes.subscribe((value) => (modesList = value))

	let devicesList: Device[]
	devices.subscribe((value) => (devicesList = value))

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

{#if modesList.length}
	<div class="modes-list">
		{#each modesList as mode}
			<ModeCard {mode} onClick={handleModeClick} onDelete={handleModeDelete} />
		{/each}
	</div>
	<a href="/add-mode/-" class="add-mode">
		<PlusIcon />
	</a>
{:else}
	<p class="no-data">There are no modes available. Create one <a href="/add-mode/-">here</a>.</p>
{/if}

<style lang="scss">
	.modes-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-xs);
		margin-top: 2rem;
	}

	.add-mode {
		display: block;
		margin-top: var(--spacing-s);

		&:hover :global(svg rect),
		&:active :global(svg rect) {
			fill: var(--color-green);
		}

		:global(svg) {
			width: auto;
			height: 2rem;
		}

		:global(svg rect) {
			fill: var(--color-grey-600);
			transition: fill 0.3s ease;
		}
	}

	.no-data {
		margin-top: var(--spacing-s);
	}
</style>
