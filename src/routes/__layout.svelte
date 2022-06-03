<script lang="ts">
	import '../app.css'
	import Sidebar from '$components/Sidebar.svelte'
	import MenuIcon from '$components/icons/menu.svelte'
	import NotificationToast from '$components/Notification.svelte'
	import { notification, setInitial } from '$stores/notifications'
	import type { Notification } from '$lib/types.d'

	let notificationObj: Notification

	notification.subscribe((value) => (notificationObj = value))

	$: if (notificationObj && notificationObj.text) {
		setTimeout(() => {
			setInitial()
		}, 4000)
	}

	let isSidebarOpen = false
	const toggleSidebar = (open: boolean) => (isSidebarOpen = open)
</script>

<main>
	<div class="menu-icon enhance-click" on:click={() => toggleSidebar(true)}>
		<MenuIcon />
	</div>

	<Sidebar isOpen={isSidebarOpen} close={() => toggleSidebar(false)} />

	<slot />

	{#if notificationObj && notificationObj.text}
		<NotificationToast text={notificationObj.text} type={notificationObj.type} />
	{/if}
</main>

<style lang="scss">
	main {
		margin: var(--spacing-s) 0;
	}
	.menu-icon {
		position: fixed;
		top: var(--spacing-xs);
		right: var(--spacing-xs);
		z-index: 111;

		&:hover :global(svg circle),
		&:active :global(svg circle) {
			transform: translate(10px, 10px);
		}
		:global(svg circle) {
			transition: transform 0.3s ease;
		}
	}

	@media screen and (min-width: 1200px) {
		main {
			display: flex;
			margin: 0;
		}
		.menu-icon {
			display: none;
		}
	}
</style>
