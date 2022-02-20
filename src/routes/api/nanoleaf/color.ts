import { NanoleafClient } from 'nanoleaf-client'
import { generateError } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const TOKEN = import.meta.env.VITE_SHAPES_TOKEN

const changeDeviceColor = (color: string, ip: string) => {
	const NanoleafDeviceClient = new NanoleafClient(ip, TOKEN)

	return NanoleafDeviceClient.setHexColor(color)
		.then(() => ({
			success: true
		}))
		.catch(() => generateError(ErrorMessage.COLOR, 'Nanoleaf'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { color, ip } = await request.json()

	return {
		body: await changeDeviceColor(color, ip)
	}
}
