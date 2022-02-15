<script lang="ts">
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import FormButton from '$components/FormButton.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
	import { user } from '$stores/user'
	import { setMessage } from '$stores/notifications'
	import { onMount, onDestroy } from 'svelte'

	let name: string = ''

	const handleForm = () => {
		user.set({ name })
		setMessage(`User name was set successfully!`)
		setTimeout(() => goto('/'), 2500)
	}

	onMount(() => document.body.classList.add('no-menu'))
	onDestroy(() => {
		if (browser) {
			document.body.classList.remove('no-menu')
		}
	})
</script>

<svelte:head>
	<title>Set user name</title>
</svelte:head>

<section>
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<h2 class="page-title">Set User name</h2>

	<form on:submit|preventDefault={handleForm} class="styled-form">
		<div class="input-group">
			<label for="modenameinput">User name</label>
			<input
				id="modenameinput"
				class="input"
				bind:value={name}
				placeholder="Write a name"
				required
			/>
		</div>

		<div class="button-container">
			<FormButton text="Submit" />
		</div>
	</form>
</section>

<style lang="scss">
	section {
		padding: var(--spacing-s);
	}
</style>
