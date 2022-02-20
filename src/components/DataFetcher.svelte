<script lang="ts">
	import { onMount } from 'svelte'
	import { devices, isLoadingDevices } from '$stores/devices'
	import { shapesDevice } from '$stores/shapes'
	import type { Device } from '$lib/types.d'

	let shapesAddress: string
	shapesDevice.subscribe((newDevice) => (shapesAddress = newDevice))

	onMount(async () => {
		isLoadingDevices.set(true)

		const goveeResponse = await fetch('/api/govee')
		const nanoleafResponse = await fetch('/api/nanoleaf', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'Shapes',
				ip: shapesAddress
			})
		})

		const goveeData = await goveeResponse.json()
		const nanoleafData = await nanoleafResponse.json()
		const allDevices = [
			...(goveeData.data && goveeData.data),
			...(nanoleafData.data && nanoleafData.data)
		]

		devices.set(allDevices)
		isLoadingDevices.set(false)
	})
</script>
