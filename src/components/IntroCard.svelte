<script lang="ts">
	import BigButton from '$components/BigButton.svelte'
	import TurnOnIcon from '$icons/turnon.svelte'
	import TurnOffIcon from '$icons/turnoff.svelte'
	import { devices } from '$stores/devices'
	import { user } from '$stores/user'
	import { setMessage } from '$stores/notifications'
	import { toggle } from '$utils/deviceRequests/index'
	import { getCurrentTime } from '$utils/helpers'
	import type { Device } from '$lib/types.d'
	import { onMount } from 'svelte'
	import { getFormattedDate } from 'nixtons-utils'

	$: currentTime = ''

	const currentDate = getFormattedDate(new Date(), 'day, dd month', 'en-us')

	let devicesList: Device[]
	let numberOfDevices: number
	devices.subscribe((value) => {
		devicesList = value
		numberOfDevices = Array.isArray(value) ? value.length : 0
	})

	let userName: string = ''
	user.subscribe((newUser) => {
		if (newUser.name) {
			userName = newUser.name
		}
	})

	const handleToggleAll = async (state: boolean) => {
		await devicesList.forEach((dev) => toggle(state, dev))
		setMessage(`All devices turned ${state ? 'on' : 'off'}!`)
	}

	onMount(() => {
		currentTime = getCurrentTime()

		setTimeout(() => {
			currentTime = getCurrentTime()
		}, 60000)
	})
</script>

<div class="intro-card card">
	<h2 class="card-title">Welcome {userName}!</h2>

	<div class="date">
		{#if currentTime}
			<h5>{currentTime}</h5>
		{/if}

		{#if currentDate}
			<h6>{currentDate}</h6>
		{/if}
	</div>

	<div class="devices">
		<h6>Devices</h6>
		<h5>{numberOfDevices}</h5>
	</div>

	<div class="buttons">
		<BigButton text="Turn on all" onClick={() => handleToggleAll(true)} accent>
			<TurnOnIcon slot="icon" />
		</BigButton>

		<BigButton text="Turn off all" onClick={() => handleToggleAll(false)}>
			<TurnOffIcon slot="icon" />
		</BigButton>
	</div>
</div>

<style lang="scss">
	.intro-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.devices {
		position: absolute;
		top: 0.5rem;
		right: 0;
		text-align: right;

		h6 {
			font-size: 1.3rem;
			font-weight: var(--font-weight-medium);
			color: var(--color-grey);
		}

		h5 {
			font-size: 4rem;
			line-height: 1;
			font-weight: var(--font-weight-semibold);
			margin-top: var(--spacing-xxs);
		}
	}

	.date {
		margin-top: var(--spacing-s);

		h5 {
			font-size: 5.3rem;
			line-height: 6rem;
			font-weight: var(--font-weight-light);
		}

		h6 {
			font-size: 1.3rem;
			font-weight: var(--font-weight-bold);
			color: var(--color-grey);
			line-height: 2rem;
		}
	}

	.buttons {
		display: flex;
		gap: var(--spacing-xs);
		margin-top: var(--spacing-s);

		:global(.big-button) {
			width: 100%;
			min-height: 10rem;
		}
	}

	@media screen and (min-width: 1200px) {
		.buttons {
			flex-direction: column;

			:global(.big-button) {
				min-height: unset;
			}
		}

		.devices {
			top: 3.5rem;
			right: var(--spacing-s);
		}
	}
</style>
