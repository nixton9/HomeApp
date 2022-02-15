import type { RequestHandler } from '@sveltejs/kit'
import { NanoleafClient } from 'nanoleaf-client'
import { parseNanoleafDevice } from '../../../utils/parsers'
import { generateError, isDeviceOffline } from '../../../utils/helpers'
import { GetDeviceRequest, ErrorMessage } from '$lib/types.d'

const TOKEN = import.meta.env.VITE_SHAPES_TOKEN as string

const getDevice = (name: string, ip: string): GetDeviceRequest => {
	const client = new NanoleafClient(ip, TOKEN)

	return client
		.getInfo()
		.then((deviceInfo) => {
			if (deviceInfo.effects?.select && deviceInfo.effects.select !== '*Solid*') {
				return client.getEffectInfo(deviceInfo.effects.select).then((effectInfo) => {
					return {
						data: [parseNanoleafDevice(deviceInfo, effectInfo, ip, TOKEN, true)]
					}
				})
			} else {
				return {
					data: [parseNanoleafDevice(deviceInfo, null, ip, TOKEN, true)]
				}
			}
		})
		.catch((err) => {
			if (isDeviceOffline(err)) {
				const offlineDevice = {
					name,
					model: '',
					state: { on: { value: false }, brightness: { value: 0 } }
				}
				return {
					data: [parseNanoleafDevice(offlineDevice, null, ip, TOKEN, false)]
				}
			} else {
				return generateError(ErrorMessage.GENERIC, 'Nanoleaf')
			}
		})
}

// @ts-ignore
export const post: RequestHandler<void, { name: string; ip: string }> = async ({
	params,
	request
}) => {
	const { name, ip } = await request.json()

	return {
		body: await getDevice(name, ip)
	}
}
