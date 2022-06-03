import { writable } from 'svelte/store'
import { browser } from '$app/env'

export const devices = writable([])
export const isLoadingDevices = writable(true)

devices.subscribe((newDevices) => {
	if (browser) {
		window.sessionStorage.setItem('devices', JSON.stringify(newDevices))
	}
})
