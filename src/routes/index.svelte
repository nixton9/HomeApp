<script lang="ts">
	import DataFetcher from '$components/DataFetcher.svelte'
	import IntroCard from '$components/IntroCard.svelte'
	import SystemInformation from '$components/SystemInformation.svelte'
	import DevicesList from '$components/DevicesList.svelte'
	import ModesList from '$components/ModesList.svelte'
	import LoadingSpinner from '$components/LoadingSpinner.svelte'
	import { isLoadingDevices } from '$stores/devices'

	let isLoading: boolean
	isLoadingDevices.subscribe((value) => (isLoading = value))
</script>

<svelte:head>
	<title>Home App</title>
</svelte:head>

<DataFetcher />

<div class="dashboard">
	<section class="main">
		{#if isLoading}
			<LoadingSpinner centered />
		{:else}
			<div class="intro-system">
				<IntroCard />
				<SystemInformation />
			</div>

			<DevicesList />
		{/if}
	</section>

	<section class="side">
		<ModesList />
	</section>
</div>

<style lang="scss">
	.main {
		position: relative;
		width: 100%;
		min-height: 50vh;
		margin: 0;
		padding: var(--spacing-xs);
		box-sizing: border-box;
	}

	.side {
		margin: 0 var(--spacing-xs);
		padding: var(--spacing-s) var(--spacing-xs);
		background: var(--grey-gradient);
		border-radius: var(--main-border-radius);
		box-sizing: border-box;
	}

	.intro-system {
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xs);
	}

	@media screen and (min-width: 1200px) {
		.dashboard {
			display: flex;
			flex-direction: row;
			flex: 1;
		}

		.main {
			display: grid;
			grid-template-columns: 3fr 4fr;
			gap: var(--spacing-xs);
			width: 70%;
			max-height: 100vh;
			margin: var(--spacing-s) 0;
			background: var(--color-black);
			border-radius: var(--main-border-radius);
		}

		.side {
			width: 30%;
			max-height: 100vh;
			background: unset;
			padding: var(--spacing-s) 0;
			margin: 0;
			border-radius: 0;
		}

		.intro-system {
			grid-template-rows: 4fr 3fr;

			:global(.big-button) {
				background: var(--color-black);
			}
		}
	}
</style>
