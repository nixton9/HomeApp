import { writable } from 'svelte/store'
import { browser } from '$app/env'

const storedModes =
	browser && window.localStorage.getItem('modes')
		? JSON.parse(window.localStorage.getItem('modes'))
		: []

export const modes = writable(storedModes)

modes.subscribe((newModes) => {
	if (browser) {
		window.localStorage.setItem('modes', JSON.stringify(newModes))
	}
})
