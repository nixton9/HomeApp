import Govee from 'node-govee-led'
import { generateError } from '../../../utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const API_KEY = import.meta.env.VITE_GOVEE_API_KEY

const changeDeviceColor = (color: string, mac: string, model: string) => {
	const GoveeDeviceClient = new Govee({
		apiKey: API_KEY,
		mac,
		model
	})

	return GoveeDeviceClient.setColor(color)
		.then(() => ({
			success: true
		}))
		.catch(() => generateError(ErrorMessage.COLOR, 'Govee'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { color, mac, model } = await request.json()

	return {
		body: await changeDeviceColor(color, mac, model)
	}
}
