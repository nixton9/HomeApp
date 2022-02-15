import { ServiceDiscovery } from 'nanoleaf-client'

const discoverDevices = () => {
	const serviceDiscovery = new ServiceDiscovery()

	return serviceDiscovery.discoverNanoleaf().then((devices) => {
		return {
			data: devices
		}
	})
}

export const get = async () => {
	return {
		body: await discoverDevices()
	}
}
