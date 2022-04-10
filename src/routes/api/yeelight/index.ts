import YeelightClient from 'yeelight-awesome'
import { parseYeelightDevice } from '$utils/parsers'
import { generateError } from '$utils/helpers'
import { GetDeviceRequest, YeelightDeviceData, ErrorMessage } from '$lib/types.d'

const { Discover, Yeelight, DevicePropery } = YeelightClient

const getDevices = (): Promise<GetDeviceRequest> => {
	const discover = new Discover({})
	const devices = []

	return discover
		.scanByIp()
		.then(async (devicesFound: { host: string; port: number }[]) => {
			for (const device of devicesFound) {
				if (!devices.find((dev) => dev.address === device.host)) {
					const yeelight = new Yeelight({
						lightIp: device.host,
						lightPort: device.port
					})

					await yeelight.connect().then(async () => {
						await yeelight
							.getProperty([
								DevicePropery.POWER,
								DevicePropery.NAME,
								'model',
								DevicePropery.BRIGHT,
								DevicePropery.HUE,
								DevicePropery.SAT,
								DevicePropery.CT
							])
							.then((res) => {
								if (res.success && res.result.result.length > 0) {
									const deviceInfo = res.result.result

									const deviceObj: YeelightDeviceData = {
										ip: device.host,
										port: device.port,
										name: deviceInfo[1],
										model: deviceInfo[2],
										state: {
											on: deviceInfo[0],
											brightness: deviceInfo[3],
											hue: deviceInfo[4],
											sat: deviceInfo[5],
											ct: deviceInfo[6]
										}
									}

									devices.push(parseYeelightDevice(deviceObj))
								}
							})
							.catch((err) => {
								console.log('err', err)
							})
							.finally(() => yeelight.disconnect())
					})
				}
			}
			return {
				data: devices
			}
		})
		.catch((err) => {
			console.log('error', err)
			return generateError(ErrorMessage.LISTING, 'Yeelight')
		})
}

export const get = async () => {
	return {
		body: await getDevices()
	}
}
