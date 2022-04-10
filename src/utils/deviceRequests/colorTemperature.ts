import { devices } from '$stores/devices'
import { setMessage, setError } from '$stores/notifications'
import { DeviceType } from '$lib/types.d'
import type { Device } from '$lib/types.d'

export const changeColorTemperature = (
	temperature: number,
	device: Device,
	withNotification = false
) => {
	switch (device.type) {
		case DeviceType.YEELIGHT:
			return changeColorTemperatureYeelight(
				temperature,
				device.address,
				device.port,
				withNotification
			)
	}
}

const handleDeviceUpdate = (temperature: number, address: string, withNotification: boolean) => {
	devices.update((devs: Device[]) => {
		const selectedDevice = devs.find((dev) => dev.address === address)
		selectedDevice.colorTemperature = temperature
		selectedDevice.turnedOn = true
		return [...devs.filter((dev) => dev.address !== address), selectedDevice]
	})

	withNotification && setMessage(`The device's color temperature was changed.`)
}

const changeColorTemperatureYeelight = async (
	temperature: number,
	address: string,
	port: number,
	withNotification: boolean
) => {
	await fetch('/api/yeelight/colortemperature', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			temperature,
			address,
			port
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.success) {
				handleDeviceUpdate(temperature, address, withNotification)
			} else {
				setError(data.error)
			}
		})
}
