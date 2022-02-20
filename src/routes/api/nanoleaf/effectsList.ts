import { NanoleafClient } from 'nanoleaf-client'
import { generateError } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const TOKEN = import.meta.env.VITE_SHAPES_TOKEN

const getDeviceEffectsList = (ip: string) => {
	const NanoleafDeviceClient = new NanoleafClient(ip, TOKEN)

	return NanoleafDeviceClient.getEffectList()
		.then((res) => ({
			data: res
		}))
		.catch(() => generateError(ErrorMessage.EFFECTLIST, 'Nanoleaf'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { ip } = await request.json()

	return {
		body: await getDeviceEffectsList(ip)
	}
}
