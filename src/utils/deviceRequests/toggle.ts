import { devices } from '$stores/devices'
import { setMessage, setError } from '$stores/notifications'
import { DeviceType } from '$lib/types.d'
import type { Device } from '$lib/types.d'

export const toggle = (state: boolean, device: Device, withNotification = false) => {
	switch (device.type) {
		case DeviceType.GOVEE:
			return toggleGovee(state, device.address, device.model, withNotification)
		case DeviceType.NANOLEAF:
			return toggleNanoleaf(state, device.address, withNotification)
		case DeviceType.YEELIGHT:
			return toggleYeelight(state, device.address, device.port, withNotification)
	}
}

const handleDeviceUpdate = (state: boolean, address: string, withNotification: boolean) => {
	devices.update((devs: Device[]) => {
		const selectedDevice = devs.find((dev) => dev.address === address)
		selectedDevice.turnedOn = state
		return [...devs.filter((dev) => dev.address !== address), selectedDevice]
	})

	withNotification && setMessage(`The device was turned ${state ? 'on' : 'off'}.`)
}

const toggleGovee = async (
	state: boolean,
	address: string,
	model: string,
	withNotification: boolean
) => {
	await fetch('/api/govee/toggle', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			state: state,
			mac: address,
			model: model
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(state, address, withNotification)
			} else {
				withNotification && setError(data.error)
			}
		})
}

const toggleNanoleaf = async (state: boolean, address: string, withNotification: boolean) => {
	await fetch('/api/nanoleaf/toggle', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			state: state,
			ip: address
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(state, address, withNotification)
			} else {
				withNotification && setError(data.error)
			}
		})
}

const toggleYeelight = async (
	state: boolean,
	address: string,
	port: number,
	withNotification: boolean
) => {
	await fetch('/api/yeelight/toggle', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			address,
			port
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(state, address, withNotification)
			} else {
				withNotification && setError(data.error)
			}
		})
}
