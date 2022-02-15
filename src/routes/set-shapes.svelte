<script lang="ts">
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'
	import FormButton from '$components/FormButton.svelte'
	import ChevronIcon from '$icons/chevron.svelte'
	import { shapesDevice } from '$stores/shapes'
	import { setMessage } from '$stores/notifications'
	import { onMount, onDestroy } from 'svelte'

	let address: string = ''

	const handleForm = () => {
		shapesDevice.set(address)
		setMessage(`The device was set successfully!`)
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
	<title>Add Shapes device</title>
</svelte:head>

<section>
	<a href="/"><button class="back-button enhance-click"><ChevronIcon /></button></a>

	<h2 class="page-title">Add Shapes device</h2>

	<form on:submit|preventDefault={handleForm} class="styled-form">
		<div class="input-group">
			<label for="modenameinput">Shapes Address</label>
			<input
				id="modenameinput"
				class="input"
				bind:value={address}
				placeholder="Write device address"
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
