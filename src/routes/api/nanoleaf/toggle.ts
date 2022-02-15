import { NanoleafClient } from 'nanoleaf-client'
import { generateError } from '../../../utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const TOKEN = import.meta.env.VITE_SHAPES_TOKEN

const toggleDevice = (state: boolean, ip: string) => {
	const NanoleafDeviceClient = new NanoleafClient(ip, TOKEN)

	if (state) {
		return NanoleafDeviceClient.turnOn()
			.then(() => ({
				success: true
			}))
			.catch(() => generateError(ErrorMessage.TOGGLE, 'Nanoleaf'))
	}

	if (!state) {
		return NanoleafDeviceClient.turnOff()
			.then(() => ({
				success: true
			}))
			.catch(() => generateError(ErrorMessage.TOGGLE, 'Nanoleaf'))
	}
}

export const post: RequestHandler = async ({ params, request }) => {
	const { state, ip } = await request.json()

	return {
		body: await toggleDevice(state, ip)
	}
}
