/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string
}

export interface GoveeDeviceData {
	device: string
	model: string
	deviceName: string
	controllable: boolean
	retrievable: boolean
	supportCmds: any[]
	properties: {
		[key: string]: any
	}
}

export type GoveeDeviceProperties = [
	{ online: boolean },
	{ powerState: boolean },
	{ brightness: number },
	{
		color: {
			r: number
			g: number
			b: number
		}
	}
]

export interface GoveeDeviceState {
	data: {
		device: string
		model: string
		properties: GoveeDeviceProperties
	}
	message: string
	code: number
}

export interface GoveeDeviceList {
	devices: GoveeDeviceData[]
}

export interface NanoleafDevice {
	name: string
	serialNo: string
	model: string
	effects: {
		effectList: string[]
		select: string
	}
	state: {
		brightness: { value: string }
		on: { value: boolean }
	}
}

export interface NanoleafDeviceData {
	name: string
	model: string
	state: NanoleafState
	serialNo?: string
	manufacturer?: string
	effects?: {
		effectsList: string[]
		select: string
	}
}

export interface NanoleafState {
	brightness: { value: number }
	on: { value: boolean }
	hue?: { value: number }
	sat?: { value: number }
	colorMode?: string
}

export interface NanoleafEffect {
	animName: string
	palette: NanoleafEffectPalette[]
}

export interface NanoleafEffectPalette {
	hue: number
	saturation: number
	brightness: number
}

export interface YeelightDeviceData {
	ip: string
	port: number
	name: string
	model: string
	state: YeelightState
}

export interface YeelightState {
	on: string
	brightness: string
	hue: string
	sat: string
	ct: string
}

export interface Device {
	address: string
	name: string
	model: string
	online: boolean
	turnedOn: boolean
	brightness: number
	color: string
	type: DeviceType
	token?: string
	port?: number
	effect?: string
	colorTemperature?: number
}

export interface GetDeviceRequest {
	data?: Device[]
	error?: string
}

export enum DeviceType {
	GOVEE = 'govee',
	NANOLEAF = 'nanoleaf',
	YEELIGHT = 'yeelight'
}

export interface Mode {
	id: string
	name: string
	devicesColors: { address: string; color: string }[]
}

export enum ErrorMessage {
	GENERIC = 'GENERIC',
	LISTING = 'LISTING',
	TOGGLE = 'TOGGLE',
	COLOR = 'COLOR',
	BRIGHTNESS = 'BRIGHTNESS',
	EFFECT = 'EFFECT',
	EFFECTLIST = 'EFFECTLIST',
	MODE = 'MODE'
}

export enum HomeTabs {
	DEVICES = 'DEVICES',
	MODES = 'MODES'
}

export interface Notification {
	text: string
	type: NotificationTypes
}

export enum NotificationTypes {
	ERROR = 'ERROR',
	SUCCESS = SUCCESS
}

export interface SystemInformation {
	cpuUsage?: number
	ramUsage?: number
	diskUsage?: number
	cpuTemperature?: number
}
