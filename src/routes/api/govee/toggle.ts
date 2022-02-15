import Govee from 'node-govee-led'
import { generateError } from '../../../utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const API_KEY = import.meta.env.VITE_GOVEE_API_KEY

const toggleDevice = (state: boolean, mac: string, model: string) => {
	const GoveeDeviceClient = new Govee({
		apiKey: API_KEY,
		mac,
		model
	})

	if (state) {
		return GoveeDeviceClient.turnOn()
			.then(() => ({
				success: true
			}))
			.catch(() => generateError(ErrorMessage.TOGGLE, 'Govee'))
	}
	if (!state) {
		return GoveeDeviceClient.turnOff()
			.then(() => ({
				success: true
			}))
			.catch(() => generateError(ErrorMessage.TOGGLE, 'Govee'))
	}
}

export const post: RequestHandler = async ({ params, request }) => {
	const { state, mac, model } = await request.json()

	return {
		body: await toggleDevice(state, mac, model)
	}
}
