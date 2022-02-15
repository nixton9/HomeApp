import { devices } from '$stores/devices'
import { setMessage, setError } from '$stores/notifications'
import type { Device } from '$lib/types.d'

const handleDeviceUpdate = (effect: string, address: string) => {
	devices.update((devs: Device[]) => {
		const selectedDevice = devs.find((dev) => dev.address === address)
		selectedDevice.effect = effect
		selectedDevice.turnedOn = true
		return [...devs.filter((dev) => dev.address !== address), selectedDevice]
	})

	setMessage(`The device's effect was changed.`)
}

export const getEffects = async (address: string) => {
	const nanoleafEffects = await fetch('/api/nanoleaf/effectsList', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			ip: address
		})
	})

	return nanoleafEffects.json()
}

export const changeEffect = async (effect: string, address: string) => {
	await fetch('/api/nanoleaf/effect', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			effect,
			ip: address
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(effect, address)
			} else {
				setError(data.error)
			}
		})
}
