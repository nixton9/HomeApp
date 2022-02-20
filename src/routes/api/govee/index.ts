import Govee from 'node-govee-led'
import { parseGoveeDevice } from '$utils/parsers'
import { generateError } from '$utils/helpers'
import { GoveeDeviceList, GoveeDeviceState, GetDeviceRequest, ErrorMessage } from '$lib/types.d'

const API_KEY = import.meta.env.VITE_GOVEE_API_KEY

const getDevices = (): GetDeviceRequest => {
	const devices = []

	const GoveeClient = new Govee({
		apiKey: API_KEY,
		mac: '',
		model: ''
	})

	return GoveeClient.getDevices()
		.then(async (data: GoveeDeviceList) => {
			for (const device of data.devices) {
				const GoveeDeviceClient = new Govee({
					apiKey: API_KEY,
					mac: device.device,
					model: device.model
				})

				await GoveeDeviceClient.getState().then((res: GoveeDeviceState) => {
					const deviceProperties = Object.assign({}, ...res.data.properties)
					devices.push(parseGoveeDevice(device, deviceProperties))
				})
			}
			return {
				data: devices
			}
		})
		.catch(() => generateError(ErrorMessage.LISTING, 'Govee'))
}

export const get = async () => {
	return {
		body: await getDevices()
	}
}
