import YeelightClient from 'yeelight-awesome'
import { generateError } from '$utils/helpers'
import { ErrorMessage } from '$lib/types.d'
import type { RequestHandler } from '@sveltejs/kit'

const { Yeelight } = YeelightClient

const changeDeviceColorTemperature = (temperature: number, address: string, port: number) => {
	const yeelight = new Yeelight({
		lightIp: address,
		lightPort: port
	})

	return yeelight
		.connect()
		.then(() =>
			yeelight
				.setCtAbx(temperature)
				.then(() => ({
					success: true
				}))
				.catch(() => generateError(ErrorMessage.COLOR, 'Yeelight'))
				.finally(() => yeelight.disconnect())
		)
		.catch(() => generateError(ErrorMessage.COLOR, 'Yeelight'))
}

export const post: RequestHandler = async ({ params, request }) => {
	const { temperature, address, port } = await request.json()

	return {
		body: await changeDeviceColorTemperature(parseInt(temperature), address, port)
	}
}
