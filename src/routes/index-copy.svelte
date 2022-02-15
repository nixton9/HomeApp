<script context="module" lang="ts">
	export const prerender = true
	/* '192.168.0.3', 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie' */

	export const load = async ({ fetch }) => {
		const goveeResponse = await fetch('api/govee')

		const nanoleafResponse = await fetch('/api/nanoleaf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'Shapes',
				ip: '192.168.0.3',
				token: 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie'
			})
		})

		const nanoleafEffectsResponse = await fetch('/api/nanoleaf/effectsList', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ip: '192.168.0.3',
				token: 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie'
			})
		})

		const goveeData = await goveeResponse.json()
		const nanoleafData = await nanoleafResponse.json()
		const devices = [
			...(goveeData.data && goveeData.data),
			...(nanoleafData.data && nanoleafData.data)
		]

		const nanoleafEffectsData = await nanoleafEffectsResponse.json()
		console.log('nanoleafEffectsData', nanoleafEffectsData)

		return {
			props: {
				devices
			}
		}
	}

	/* GOVEE METHODS */

	const toggle = async () => {
		await fetch('/api/govee/toggle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				state: 'off',
				mac: '4E:5B:CE:33:36:32:13:2E',
				model: 'H6062'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}

	const changeColor = async () => {
		await fetch('/api/govee/color', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				color: '#fc03c6',
				mac: '4E:5B:CE:33:36:32:13:2E',
				model: 'H6062'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}

	const changeBrightness = async () => {
		await fetch('/api/govee/brightness', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				brightness: '100',
				mac: '4E:5B:CE:33:36:32:13:2E',
				model: 'H6062'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}

	/* NANOLEAF METHODS */

	const toggleNanoleaf = async () => {
		await fetch('/api/nanoleaf/toggle', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				state: 'off',
				ip: '192.168.0.3',
				token: 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}

	const changeColorNanoleaf = async () => {
		await fetch('/api/nanoleaf/color', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				color: '#ffffff',
				ip: '192.168.0.3',
				token: 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}

	const changeBrightnessNanoleaf = async () => {
		await fetch('/api/nanoleaf/brightness', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				brightness: '100',
				ip: '192.168.0.3',
				token: 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}

	const changeEffect = async () => {
		await fetch('/api/nanoleaf/effect', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				effect: 'Late Night Chill Vibes',
				ip: '192.168.0.3',
				token: 'FmwXvvRmX490pMzDxabdCzrwnsY2Jtie'
			})
		})
			.then((res) => res.json())
			.then((data) => console.log('data', data))
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Govee</h1>
	<button on:click={toggle}> Toggle </button>
	<button on:click={changeColor}> Change color </button>
	<button on:click={changeBrightness}> Change Brightness </button>

	<br />
	<hr />
	<br />

	<h1>Nanoleaf</h1>
	<button on:click={toggleNanoleaf}> Toggle </button>
	<button on:click={changeColorNanoleaf}> Change color </button>
	<button on:click={changeBrightnessNanoleaf}> Change Brightness </button>
	<button on:click={changeEffect}> Change Effect </button>
</section>

<style>
</style>
