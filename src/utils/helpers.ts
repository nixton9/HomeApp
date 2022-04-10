/* eslint-disable prefer-const */
import { ErrorMessage } from '$lib/types.d'

export const isDeviceOffline = (err: { message: string }) =>
	err.message && err.message === 'The device is offline'

export const hasProperty = (obj: any, prop: string) =>
	Object.prototype.hasOwnProperty.call(obj, prop)

export const HSBToRGB = (
	hue: number,
	saturation: number,
	brightness: number
): { r: number; g: number; b: number } => {
	saturation /= 100
	brightness /= 100

	const k = (n: number) => (n + hue / 60) % 6
	const f = (n: number) => brightness * (1 - saturation * Math.max(0, Math.min(k(n), 4 - k(n), 1)))

	return {
		r: Math.round(255 * f(5)),
		g: Math.round(255 * f(3)),
		b: Math.round(255 * f(1))
	}
}

export const RGBToHEX = (r: number, g: number, b: number) =>
	'#' +
	[r, g, b]
		.map((x) => {
			const hex = x.toString(16)
			return hex.length === 1 ? '0' + hex : hex
		})
		.join('')

export const HEXToRGB = (hex: string) => {
	const bigint = parseInt(hex.replace('#', ''), 16)
	const r = (bigint >> 16) & 255
	const g = (bigint >> 8) & 255
	const b = bigint & 255

	return {
		r,
		g,
		b
	}
}

export const getColorWithContrast = (color: string): string => {
	const hexCode = color.charAt(0) === '#' ? color.substr(1, 6) : color

	const hexR = parseInt(hexCode.substr(0, 2), 16)
	const hexG = parseInt(hexCode.substr(2, 2), 16)
	const hexB = parseInt(hexCode.substr(4, 2), 16)

	const contrastRatio = (hexR + hexG + hexB) / (255 * 3)

	return contrastRatio >= 0.5 ? 'var(--color-black)' : 'var(--color-white)'
}

export const getModeBGColor = (devicesColors: { color: string }[]) => {
	if (devicesColors.length > 1) {
		let colorString = 'linear-gradient(45deg'
		devicesColors.forEach((dev) => (colorString += `,${dev.color}`))
		colorString += ')'
		return colorString
	}
	return devicesColors[0].color
}

export const debounce = (func: (arg?: any) => void, timeout = 300) => {
	let timer: NodeJS.Timeout
	return (...args: any) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}

export const base64ToText = (hash: string): string => {
	if (isStringBase64(hash)) {
		const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

		let e = {},
			i: number,
			b = 0,
			c: number,
			x: number,
			l = 0,
			a: number,
			r = '',
			w = String.fromCharCode,
			L = hash.length

		for (i = 0; i < 64; i++) {
			e[A.charAt(i)] = i
		}

		for (x = 0; x < L; x++) {
			c = e[hash.charAt(x)]
			b = (b << 6) + c
			l += 6
			while (l >= 8) {
				;((a = (b >>> (l -= 8)) & 0xff) || x < L - 2) && (r += w(a))
			}
		}

		return hash ? r : 'Device'
	}

	return hash
}

export const generateError = (type: ErrorMessage, deviceName?: string): { error: string } => {
	let error: string

	switch (type) {
		case ErrorMessage.GENERIC:
			error = `There was a problem with the request.`
			break

		case ErrorMessage.LISTING:
			error = `There was a problem getting ${deviceName} devices.`
			break

		case ErrorMessage.TOGGLE:
			error = `There was a problem toggling the ${deviceName} device.`
			break

		case ErrorMessage.COLOR:
			error = `There was a problem changing the color of the ${deviceName} device.`
			break

		case ErrorMessage.BRIGHTNESS:
			error = `There was a problem changing the brightness of the ${deviceName} device.`
			break

		case ErrorMessage.MODE:
			error = `There was a problem changing the mode.`
			break

		case ErrorMessage.EFFECT:
			error = `There was a problem changing the effect on the ${deviceName} device.`
			break

		case ErrorMessage.EFFECTLIST:
			error = `There was a problem getting the effects list for the ${deviceName} device.`
			break

		default:
			error = `There was a problem with the request.`
			break
	}

	return {
		error
	}
}

const isStringBase64 = (str: string) => {
	const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

	return base64Regex.test(str)
}
