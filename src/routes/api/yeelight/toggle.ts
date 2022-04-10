import YeelightClient from 'yeelight-awesome'
import { generateError } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const { Yeelight } = YeelightClient

const toggleDevice = (address: string, port: number) => {
	const yeelight = new Yeelight({
		lightIp: address,
		lightPort: port
	})

	return yeelight
		.connect()
		.then(() =>
			yeelight
				.toggle()
				.then(() => ({
					success: true
				}))
				.catch(() => generateError(ErrorMessage.TOGGLE, 'Yeelight'))
				.finally(() => yeelight.disconnect())
		)
		.catch(() => generateError(ErrorMessage.TOGGLE, 'Yeelight'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { address, port } = await request.json()

	return {
		body: await toggleDevice(address, port)
	}
}
