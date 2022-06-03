<script lang="ts">
	import ChevronIcon from '$icons/chevron.svelte'
	import BigButton from '$components/BigButton.svelte'
	import { goto } from '$app/navigation'
	import { user } from '$stores/user'
	import { shapesDevice } from '$stores/shapes'
	import { setMessage } from '$stores/notifications'

	let name: string = ''
	let address: string = ''

	user.subscribe((newVal) => (name = newVal.name || ''))

	shapesDevice.subscribe((newVal) => (address = newVal))

	const handleSubmit = (e) => {
		user.set({ name })
		shapesDevice.set(address)
		setMessage(`Your settings were saved!`)
		setTimeout(() => goto('/'), 2500)
	}
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<section class="page">
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<div class="page-content">
		<h2 class="page-title">Settings</h2>

		<form on:submit|preventDefault={handleSubmit} class="styled-form">
			<div class="input-group">
				<label for="username">Username</label>
				<input id="username" bind:value={name} placeholder="Write a name" />
			</div>

			<div class="input-group">
				<label for="shapesaddress">Shapes Device</label>
				<input id="shapesaddress" bind:value={address} placeholder="Write the device IP" />
			</div>

			<BigButton text="Save" accent formButton />
		</form>
	</div>
</section>

<style lang="scss">
	section {
		padding-top: var(--spacing-s);
	}

	.page-title {
		width: 100%;
		white-space: nowrap;
		box-sizing: border-box;
	}

	.styled-form {
		margin-top: var(--spacing-m);
	}

	.styled-form .input-group {
		margin-top: var(--spacing-m);
	}

	.styled-form :global(.big-button) {
		min-width: 28rem;
		margin-top: var(--spacing-l);
	}

	@media screen and (max-width: 450px) {
		.styled-form .input-group :global(input),
		.styled-form :global(.big-button) {
			width: 100%;
			min-width: unset;
		}

		.styled-form :global(.big-button) {
			margin-top: var(--spacing-m);
		}
	}
</style>
