import {
	GoveeDeviceData,
	Device,
	DeviceType,
	NanoleafDeviceData,
	NanoleafEffect,
	NanoleafEffectPalette,
	NanoleafState,
	YeelightDeviceData,
	YeelightState
} from '$lib/types.d'
import { HSBToRGB, RGBToHEX, hasProperty, base64ToText } from './helpers'

export const parseGoveeDevice = (
	device: GoveeDeviceData,
	deviceProperties: { [key: string]: any }
): Device => ({
	address: device.device,
	name: device.deviceName,
	model: device.model,
	online: deviceProperties.online,
	turnedOn: deviceProperties.powerState === 'on',
	brightness: deviceProperties.brightness,
	type: DeviceType.GOVEE,
	color: parseGoveeColor(deviceProperties.color)
})

const parseGoveeColor = (colorObj: { [key: string]: number }): string | null => {
	return hasProperty(colorObj, 'r') && hasProperty(colorObj, 'g') && hasProperty(colorObj, 'b')
		? RGBToHEX(colorObj.r, colorObj.g, colorObj.b)
		: null
}

export const parseNanoleafDevice = (
	device: NanoleafDeviceData,
	effect: NanoleafEffect,
	ip: string,
	token: string,
	online?: boolean
): Device => ({
	address: ip,
	name: parseNanoleafName(device.name),
	model: device.model,
	online: Boolean(online),
	turnedOn: device.state.on.value,
	brightness: device.state.brightness.value,
	effect: device.effects?.select,
	type: DeviceType.NANOLEAF,
	token,
	color: effect?.palette
		? parseNanoleafEffectColor(effect.palette)
		: device.state
		? parseNanoleafSolidColor(device.state)
		: null
})

const parseNanoleafSolidColor = (state: NanoleafState): string | null => {
	if (hasProperty(state, 'hue') && hasProperty(state, 'sat') && hasProperty(state, 'brightness')) {
		const { r, g, b } = HSBToRGB(state.hue.value, state.sat.value, state.brightness.value)
		return RGBToHEX(r, g, b)
	}

	return null
}

const parseNanoleafEffectColor = (palette: NanoleafEffectPalette[]): string | null => {
	const color = palette.length ? palette[0] : null
	const { hue, saturation, brightness } = color

	if (color) {
		const { r, g, b } = HSBToRGB(hue, saturation, brightness)
		return RGBToHEX(r, g, b)
	}

	return null
}

const parseNanoleafName = (name: string): string => name.includes('Shapes') ? 'Shapes' : name 

export const parseYeelightDevice = (device: YeelightDeviceData): Device => ({
	address: device.ip,
	port: device.port,
	name: base64ToText(device.name),
	model: device.model,
	online: true,
	turnedOn: device.state.on === 'on',
	brightness: Number(device.state.brightness),
	type: DeviceType.YEELIGHT,
	color: parseYeelightColor(device.state),
	colorTemperature: parseInt(device.state.ct)
})

const parseYeelightColor = (state: YeelightState): string | null => {
	if (hasProperty(state, 'brightness') && hasProperty(state, 'hue') && hasProperty(state, 'sat')) {
		const { r, g, b } = HSBToRGB(Number(state.hue), Number(state.sat), Number(state.brightness))
		return RGBToHEX(r, g, b)
	}
	return null
}
