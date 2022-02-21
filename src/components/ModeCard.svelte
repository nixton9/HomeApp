<script lang="ts">
	import EditIcon from '$icons/edit.svelte'
	import TrashIcon from '$icons/trash.svelte'
	import { getModeBGColor } from '$utils/helpers'
	import type { Mode } from '$lib/types.d'

	export let mode: Mode
	export let onClick: (mode: Mode) => void
	export let onDelete: (id: string) => void
</script>

<div
	class="mode-card contrast-hover"
	on:click={() => onClick(mode)}
	style="background: {getModeBGColor(mode.devicesColors)}"
>
	<a href={`/add-mode/${mode.id}`} on:click|stopPropagation class="edit enhance-click">
		<EditIcon />
	</a>

	<span on:click|stopPropagation={() => onDelete(mode.id)} class="delete enhance-click">
		<TrashIcon />
	</span>

	<h3>{mode.name}</h3>
</div>

<style lang="scss">
	.mode-card {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 14rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--main-border-radius);
		box-shadow: var(--main-box-shadow);
		cursor: pointer;
	}

	h3 {
		font-size: 1.6rem;
		color: var(--color-white);
	}

	.edit,
	.delete {
		position: absolute;
		top: var(--spacing-xxs);
		cursor: pointer;
		z-index: 1;
	}

	.edit {
		left: var(--spacing-xxs);
		fill: var(--color-white);

		:global(svg path) {
			fill: inherit;
		}
	}

	.delete {
		right: var(--spacing-xxs);
		stroke: var(--color-white);

		:global(svg line),
		:global(svg g) {
			stroke: inherit;
		}
	}
</style>
