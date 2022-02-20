import { NanoleafClient } from 'nanoleaf-client'
import { generateError } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const TOKEN = import.meta.env.VITE_SHAPES_TOKEN

const changeDeviceBrightness = (brightness: number, ip: string) => {
	const NanoleafDeviceClient = new NanoleafClient(ip, TOKEN)

	return NanoleafDeviceClient.setBrightness(brightness)
		.then(() => ({
			success: true
		}))
		.catch(() => generateError(ErrorMessage.COLOR, 'Nanoleaf'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { brightness, ip } = await request.json()

	return {
		body: await changeDeviceBrightness(parseInt(brightness), ip)
	}
}
