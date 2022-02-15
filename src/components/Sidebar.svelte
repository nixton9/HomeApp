<script lang="ts">
	import MenuCloseIcon from '$icons/menuclose.svelte'
	import PlusIcon from '$icons/plus.svelte'
	import BulbIcon from '$icons/bulb.svelte'
	import UserIcon from '$icons/user.svelte'

	export let isOpen: boolean
	export let close: () => void
</script>

{#if isOpen}
	<div class="overlay" on:click={() => close()} />
{/if}

<div class={isOpen ? 'sidebar open' : 'sidebar'}>
	<div class="header">
		<h3>Options</h3>
		<div class="menu-close-icon enhance-click" on:click={() => close()}>
			<MenuCloseIcon />
		</div>
	</div>

	<nav>
		<ul>
			<a href="/add-mode" on:click={() => close()}><li><PlusIcon /> Add mode</li></a>
			<a href="/set-shapes" on:click={() => close()}><li><BulbIcon /> Set Shapes device</li></a>
			<a href="/set-name" on:click={() => close()}><li><UserIcon /> Set User name</li></a>
		</ul>
	</nav>
</div>

<style lang="scss">
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1;
	}

	.sidebar {
		position: fixed;
		height: 100vh;
		width: 55vw;
		min-width: 20rem;
		top: 0;
		right: 0;
		padding: var(--spacing-s) var(--spacing-xs) var(--spacing-s) var(--spacing-s);
		background-color: var(--color-black-600);
		transition: transform 0.3s ease;
		transform: translateX(100%);
		z-index: 11;
		box-shadow: -6px 15px 11px rgb(36, 38, 49);
		border-top-left-radius: var(--main-border-radius);
		border-bottom-left-radius: var(--main-border-radius);

		&.open {
			transform: translateX(0);
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		h3 {
			font-size: 2rem;
			font-weight: var(--font-weight-bold);
		}

		.menu-close-icon {
			position: relative;
		}
	}

	nav {
		margin-top: var(--spacing-l);

		li {
			display: flex;
			align-items: center;
			font-size: 1.5rem;
			font-weight: var(--font-weight-regular);
			margin: var(--spacing-xs) 0;
			padding: var(--spacing-xs);
			border-radius: var(--main-border-radius);
			transition: background 0.25s ease;
			cursor: pointer;

			&:hover,
			&:active,
			&:focus {
				background: var(--color-black-800);
			}

			:global(svg) {
				width: 2.2rem;
				height: 2.2rem;
				margin-right: var(--spacing-xs);
			}
		}
	}
</style>
