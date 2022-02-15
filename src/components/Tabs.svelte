<script lang="ts">
	export let tabs: string[]
	export let activeTab: string
	export let changeTab: (tab: string) => void

	$: isTabActive = (tab: string) => activeTab.toLowerCase() === tab.toLowerCase()
</script>

<div class="tabs">
	{#each tabs as tab}
		<p class={isTabActive(tab) ? 'active' : ''} on:click={() => changeTab(tab)}>
			{tab}
		</p>
	{/each}
</div>

<style lang="scss">
	.tabs {
		display: flex;
		padding-bottom: var(--spacing-xs);
	}

	p {
		position: relative;
		font-size: 1.6rem;
		font-weight: var(--font-weight-black);
		color: var(--color-grey-600);
		margin-right: var(--spacing-s);
		transition: color 0.25s ease;
		cursor: pointer;

		&:after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -1.2rem;
			width: 0;
			height: 3px;
			background-color: var(--color-white);
			border-radius: var(--main-border-radius);
			transition: width 0.25s ease;
		}

		&.active {
			color: var(--color-white);

			&:after {
				width: 100%;
			}
		}
	}
</style>
