<script lang="ts">
	import { getSystemInfoClass } from '$utils/helpers'
	import type { SystemInformation } from '$lib/types.d'
	import { onMount } from 'svelte'
	import { isNumber } from 'nixtons-utils'

	let systemInformation: SystemInformation

	onMount(async () => {
		const systemResponse = await fetch('/api/systemInformation')
		const systemResponseData = await systemResponse.json()
		systemInformation = systemResponseData.data
	})
</script>

<div class="system-card card">
	<h2 class="card-title">System Information</h2>

	{#if systemInformation}
		<div class="items">
			<div class="item">
				<div class="bar {getSystemInfoClass(systemInformation.cpuTemperature, false)}" />
				<div class="value">
					{#if isNumber(systemInformation.cpuTemperature)}
						<h5>{systemInformation.cpuTemperature}º <span>C</span></h5>
					{:else}
						<h5>-</h5>
					{/if}
					<h6>Temperature</h6>
				</div>
			</div>

			<div class="item">
				<div class="bar {getSystemInfoClass(systemInformation.cpuUsage)}" />
				<div class="value">
					{#if isNumber(systemInformation.cpuUsage)}
						<h5>{systemInformation.cpuUsage} <span>%</span></h5>
					{:else}
						<h5>-</h5>
					{/if}
					<h6>CPU Usage</h6>
				</div>
			</div>

			<div class="item">
				<div class="bar {getSystemInfoClass(systemInformation.ramUsage)}" />
				<div class="value">
					{#if isNumber(systemInformation.ramUsage)}
						<h5>{systemInformation.ramUsage} <span>%</span></h5>
					{:else}
						<h5>-</h5>
					{/if}
					<h6>Memory Usage</h6>
				</div>
			</div>

			<div class="item">
				<div class="bar {getSystemInfoClass(systemInformation.diskUsage)}" />
				<div class="value">
					{#if isNumber(systemInformation.diskUsage)}
						<h5>{systemInformation.diskUsage} <span>%</span></h5>
					{:else}
						<h5>-</h5>
					{/if}
					<h6>Disk Usage</h6>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.system-card {
		background: var(--grey-gradient);
		padding: var(--spacing-s);
	}

	.card-title {
		display: none;
	}

	.items {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		place-items: center;
		gap: var(--spacing-s);
	}

	.item {
		display: flex;

		.value {
			margin-left: var(--spacing-xs);

			h5 {
				font-size: 3.3rem;
				line-height: 3.1rem;
				font-weight: var(--font-weight-medium);

				span {
					font-size: 2.2rem;
					line-height: 3.3rem;
					font-weight: var(--font-weight-regular);
				}
			}

			h6 {
				font-size: 1.1rem;
				line-height: 1;
				font-weight: var(--font-weight-bold);
				color: var(--color-grey);
				transform: translateX(3px);
			}
		}
	}

	.bar {
		position: relative;
		width: 0.4rem;
		height: 2.8rem;
		border-radius: 50px;

		&:after {
			content: '';

			position: absolute;
			top: 50%;
			left: 50%;
			width: 75%;
			height: 75%;
			filter: blur(10px);
			transform: translate(-50%, -50%);
		}

		&.green {
			background-color: var(--color-green);

			&:after {
				background: rgba(105, 234, 173, 1);
			}
		}
		&.blue {
			background-color: var(--color-blue);

			&:after {
				background: rgba(105, 165, 234, 1);
			}
		}
		&.yellow {
			background-color: var(--color-yellow);

			&:after {
				background: rgba(255, 238, 38, 1);
			}
		}
		&.red {
			background-color: var(--color-red);

			&:after {
				background: rgba(224, 88, 114, 1);
			}
		}
	}

	@media screen and (min-width: 1200px) {
		.card-title {
			display: block;
		}

		.items {
			grid-template-columns: 1fr 1fr;
			width: calc(100% - 6rem);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	@media screen and (max-width: 510px) {
		.items {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
		}
	}
</style>
