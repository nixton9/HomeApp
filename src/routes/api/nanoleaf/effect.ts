import { NanoleafClient } from 'nanoleaf-client'
import { generateError } from '../../../utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const TOKEN = import.meta.env.VITE_SHAPES_TOKEN

const changeDeviceEffect = (effect: string, ip: string) => {
	const NanoleafDeviceClient = new NanoleafClient(ip, TOKEN)
	console.log('effect', effect)
	return NanoleafDeviceClient.setEffect(effect)
		.then((res) => {
			console.log('res', res)
			return {
				success: true
			}
		})
		.catch(() => generateError(ErrorMessage.EFFECT, 'Nanoleaf'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { effect, ip } = await request.json()

	return {
		body: await changeDeviceEffect(effect, ip)
	}
}
