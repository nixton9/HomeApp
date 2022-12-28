import { writable } from 'svelte/store'
import { browser } from '$app/env'

const storedDevice =
	browser && window.localStorage.getItem('shapesDevice')
		? window.localStorage.getItem('shapesDevice')
		: '192.168.1.87'

export const shapesDevice = writable(storedDevice)

shapesDevice.subscribe((newDevice) => {
	if (browser) {
		window.localStorage.setItem('shapesDevice', newDevice)
	}
})
