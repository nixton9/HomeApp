import { writable } from 'svelte/store'

export const devices = writable([])
export const isLoadingDevices = writable(true)
