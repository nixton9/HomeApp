import { devices } from '$stores/devices'
import { setMessage, setError } from '$stores/notifications'
import { DeviceType } from '$lib/types.d'
import type { Device } from '$lib/types.d'

export const changeBrightness = (brightness: number, device: Device, withNotification = false) => {
	switch (device.type) {
		case DeviceType.GOVEE:
			return changeBrightnessGovee(brightness, device.address, device.model, withNotification)
		case DeviceType.NANOLEAF:
			return changeBrightnessNanoleaf(brightness, device.address, withNotification)
		case DeviceType.YEELIGHT:
			return changeBrightnessYeelight(brightness, device.address, device.port, withNotification)
	}
}

const handleDeviceUpdate = (brightness: number, address: string, withNotification: boolean) => {
	devices.update((devs: Device[]) => {
		const selectedDevice = devs.find((dev) => dev.address === address)
		selectedDevice.brightness = brightness
		selectedDevice.turnedOn = true
		return [...devs.filter((dev) => dev.address !== address), selectedDevice]
	})

	withNotification && setMessage(`The device's brightness was changed.`)
}

const changeBrightnessGovee = async (
	brightness: number,
	address: string,
	model: string,
	withNotification: boolean
) => {
	await fetch('/api/govee/brightness', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			brightness: brightness,
			mac: address,
			model: model
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(brightness, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}

const changeBrightnessNanoleaf = async (
	brightness: number,
	address: string,
	withNotification: boolean
) => {
	await fetch('/api/nanoleaf/brightness', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			brightness: brightness,
			ip: address
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(brightness, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}

const changeBrightnessYeelight = async (
	brightness: number,
	address: string,
	port: number,
	withNotification: boolean
) => {
	await fetch('/api/yeelight/brightness', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			brightness,
			address,
			port
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(brightness, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}
