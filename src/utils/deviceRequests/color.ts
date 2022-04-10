import { devices } from '$stores/devices'
import { setMessage, setError } from '$stores/notifications'
import { DeviceType } from '$lib/types.d'
import type { Device } from '$lib/types.d'

export const changeColor = (color: string, device: Device, withNotification = false) => {
	switch (device.type) {
		case DeviceType.GOVEE:
			return changeColorGovee(color, device.address, device.model, withNotification)
		case DeviceType.NANOLEAF:
			return changeColorNanoleaf(color, device.address, withNotification)
		case DeviceType.YEELIGHT:
			return changeColorYeelight(color, device.address, device.port, withNotification)
	}
}

const handleDeviceUpdate = (color: string, address: string, withNotification: boolean) => {
	devices.update((devs: Device[]) => {
		const selectedDevice = devs.find((dev) => dev.address === address)
		selectedDevice.color = color
		selectedDevice.turnedOn = true
		return [...devs.filter((dev) => dev.address !== address), selectedDevice]
	})

	withNotification && setMessage(`The device's color was changed.`)
}

const changeColorGovee = async (
	color: string,
	address: string,
	model: string,
	withNotification: boolean
) => {
	await fetch('/api/govee/color', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			color: color,
			mac: address,
			model: model
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(color, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}

const changeColorNanoleaf = async (color: string, address: string, withNotification: boolean) => {
	await fetch('/api/nanoleaf/color', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			color: color,
			ip: address
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(color, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}

const changeColorYeelight = async (
	color: string,
	address: string,
	port: number,
	withNotification: boolean
) => {
	await fetch('/api/yeelight/color', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			color,
			address,
			port
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(color, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}
