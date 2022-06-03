<script lang="ts">
	import EditIcon from '$icons/edit.svelte'
	import TrashIcon from '$icons/trash.svelte'
	import { getModeBGColor } from '$utils/helpers'
	import type { Mode } from '$lib/types.d'

	export let mode: Mode
	export let withButtons: boolean
	export let isActive: boolean = false
	export let onClick: (mode: Mode) => void
	export let onDelete: (id: string) => void
</script>

<div
	class="mode-card contrast-hover"
	on:click={() => onClick(mode)}
	style="background: {getModeBGColor(mode.devicesColors)}"
>
	{#if withButtons}
		<a href={`/add-mode/${mode.id}`} on:click|stopPropagation class="edit enhance-click">
			<EditIcon />
		</a>

		<span on:click|stopPropagation={() => onDelete(mode.id)} class="delete enhance-click">
			<TrashIcon />
		</span>
	{:else}
		<div class="indicator {isActive ? 'selected' : ''}" />
	{/if}
	<h3>{mode.name}</h3>

	{#if isActive}
		<div class="glow" style="background: {getModeBGColor(mode.devicesColors)}" />
	{/if}
</div>

<style lang="scss">
	.mode-card {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 14rem;
		border-radius: var(--main-border-radius);
		cursor: pointer;
	}

	h3 {
		position: absolute;
		bottom: 2rem;
		left: 2.5rem;
		font-size: 1.4rem;
		font-weight: var(--font-weight-medium);
	}

	.edit,
	.delete {
		position: absolute;
		top: var(--spacing-xs);
		opacity: 0.9;
		cursor: pointer;
		z-index: 1;

		:global(svg) {
			width: auto;
			height: 1.8rem;
		}
	}

	.edit {
		left: var(--spacing-xs);
		fill: var(--color-white);
	}

	.delete {
		right: var(--spacing-xs);
		stroke: var(--color-white);
	}

	.indicator {
		position: absolute;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		width: 1.3rem;
		height: 1.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		border: 1px solid var(--color-white);

		&.selected:after {
			content: '';
			width: 0.9rem;
			height: 0.9rem;
			background: var(--color-white);
			border-radius: 50%;
		}
	}

	.glow {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		border-radius: var(--main-border-radius);
		transform: translate(-50%, -50%);
		opacity: 0.5;
		filter: blur(16px);
		z-index: -1;
	}
</style>
