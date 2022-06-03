<script lang="ts">
	import AppIcon from '$icons/homeapp.svelte'
	import HomeIcon from '$icons/home.svelte'
	import DeviceIcon from '$icons/device.svelte'
	import SceneIcon from '$icons/scene.svelte'
	import SettingsIcon from '$icons/settings.svelte'
	import { page } from '$app/stores'

	export let isOpen: boolean
	export let close: () => void
</script>

{#if isOpen}
	<div class="overlay" on:click={() => close()} />
{/if}

<div class={isOpen ? 'sidebar open' : 'sidebar'}>
	<div class="header">
		<AppIcon />
	</div>

	<nav>
		<ul>
			<a href="/" on:click={() => close()} class:active={$page.url.pathname === '/'}>
				<li>
					<div class="icon"><HomeIcon /></div>
				</li>
			</a>
			<a href="/devices" on:click={() => close()} class:active={$page.url.pathname === '/devices'}>
				<li>
					<div class="icon"><DeviceIcon /></div>
				</li>
			</a>
			<a href="/modes" on:click={() => close()} class:active={$page.url.pathname === '/modes'}>
				<li>
					<div class="icon"><SceneIcon /></div>
				</li>
			</a>
		</ul>
	</nav>

	<div class="footer">
		<a href="/settings" on:click={() => close()} class:active={$page.url.pathname === '/settings'}>
			<div class="icon settings-icon"><SettingsIcon /></div>
		</a>
	</div>
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		height: 100vh;
		width: 8.3rem;
		top: 0;
		right: 0;
		padding: var(--spacing-s) var(--spacing-xs);
		background: var(--grey-gradient);
		transition: transform 0.3s ease;
		transform: translateX(100%);
		z-index: 11;
		box-shadow: -2px 10px 16px rgba(0, 0, 0, 0.2);

		&.open {
			transform: translateX(0);
		}
	}

	.header {
		color: var(--color-green);
	}

	nav {
		margin-bottom: var(--spacing-xl);
	}

	a {
		display: block;
		position: relative;

		&.active:before {
			content: '';
			position: absolute;
			left: -1.6rem;
			width: 0.5rem;
			height: 100%;
			background-color: var(--color-green);
			border-radius: 50px;
			display: none;
		}
	}

	li {
		display: flex;
		align-items: center;
		font-size: 1.5rem;
		font-weight: var(--font-weight-regular);
		margin: var(--spacing-xs) 0;
		padding: var(--spacing-xs);
		border-radius: 1rem;
		transition: background 0.25s ease;
		cursor: pointer;

		&:hover,
		&:active,
		&:focus {
			background: var(--color-black);
		}
	}

	.icon {
		position: relative;

		:global(svg) {
			display: block;
			width: 2.5rem;
			height: 2.5rem;
			color: var(--color-grey);
		}
	}

	.active .icon {
		:global(svg) {
			color: var(--color-green);
		}

		&:after {
			content: '';
			background: rgba(105, 234, 173, 0.65);
			position: absolute;
			top: 50%;
			left: 50%;
			width: 60%;
			height: 60%;
			z-index: -1;
			filter: blur(16px);
			transform: translate(-50%, -50%);
		}
	}

	.settings-icon {
		padding: var(--spacing-xs);

		&:after {
			opacity: 0.3;
		}
	}

	@media screen and (min-width: 1200px) {
		.overlay  {
			display: none;
		}

		.sidebar {
			position: unset;
			background: unset;
			border-radius: 0;
			box-shadow: unset;
			transform: none;
		}

		a.active:before {
			display: block;
		}
	}
</style>
