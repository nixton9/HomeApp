<script lang="ts">
	import { getColorWithContrast } from '$utils/helpers'
	import type { Mode } from '$lib/types.d'

	export let mode: Mode
	export let onClick: (mode: Mode) => void
</script>

<div class="mode-card" on:click={() => onClick(mode)} style="background: {mode.color}">
	<h3 style="color: {getColorWithContrast(mode.color)}">{mode.name}</h3>
</div>

<style lang="scss">
	.mode-card {
		width: 100%;
		height: 100%;
		min-height: 14rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--main-border-radius);
		box-shadow: var(--main-box-shadow);
		cursor: pointer;

		h3 {
			font-size: 1.6rem;
		}
	}
</style>
