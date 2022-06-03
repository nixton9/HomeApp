<script lang="ts">
	import { onMount } from 'svelte'
	import { devices, isLoadingDevices } from '$stores/devices'
	import { shapesDevice } from '$stores/shapes'

	let shapesAddress: string
	shapesDevice.subscribe((newDevice) => (shapesAddress = newDevice))

	onMount(async () => {
		const SSDevices = JSON.parse(window.sessionStorage.getItem('devices'))
		if (SSDevices && SSDevices.length > 0) {
			devices.set(SSDevices)
		} else {
			isLoadingDevices.set(true)

			const goveeResponse = await fetch('/api/govee')
			const yeelightResponse = await fetch('/api/yeelight')
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
			const yeelightData = await yeelightResponse.json()
			const nanoleafData = await nanoleafResponse.json()
			const allDevices = [
				...(goveeData.data ? goveeData.data : []),
				...(yeelightData.data ? yeelightData.data : []),
				...(nanoleafData.data ? nanoleafData.data : [])
			]

			devices.set(allDevices)
			isLoadingDevices.set(false)
		}
	})
</script>
