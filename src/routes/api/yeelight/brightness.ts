import YeelightClient from 'yeelight-awesome'
import { generateError } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const { Yeelight } = YeelightClient

const changeDeviceBrightness = (brightness: number, address: string, port: number) => {
	const yeelight = new Yeelight({
		lightIp: address,
		lightPort: port
	})

	return yeelight
		.connect()
		.then(() =>
			yeelight
				.setBright(brightness)
				.then(() => ({
					success: true
				}))
				.catch(() => generateError(ErrorMessage.BRIGHTNESS, 'Yeelight'))
				.finally(() => yeelight.disconnect())
		)
		.catch(() => generateError(ErrorMessage.BRIGHTNESS, 'Yeelight'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { brightness, address, port } = await request.json()

	return {
		body: await changeDeviceBrightness(parseInt(brightness), address, port)
	}
}
