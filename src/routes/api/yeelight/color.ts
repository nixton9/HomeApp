import YeelightClient from 'yeelight-awesome'
import { generateError, HEXToRGB } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const { Yeelight, Color } = YeelightClient

const changeDeviceColor = (color: string, address: string, port: number) => {
	const yeelight = new Yeelight({
		lightIp: address,
		lightPort: port
	})

	const { r, g, b } = HEXToRGB(color)

	return yeelight
		.connect()
		.then(() =>
			yeelight
				.setRGB(new Color(r, g, b), 'smooth')
				.then(() => ({
					success: true
				}))
				.catch(() => generateError(ErrorMessage.COLOR, 'Yeelight'))
				.finally(() => yeelight.disconnect())
		)
		.catch(() => generateError(ErrorMessage.COLOR, 'Yeelight'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { color, address, port } = await request.json()

	return {
		body: await changeDeviceColor(color, address, port)
	}
}
