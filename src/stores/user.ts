import { writable } from 'svelte/store'
import { browser } from '$app/env'

const storedUser =
	browser && window.localStorage.getItem('user')
		? JSON.parse(window.localStorage.getItem('user'))
		: {}

export const user = writable(storedUser)

user.subscribe((newUser) => {
	if (browser) {
		window.localStorage.setItem('user', JSON.stringify(newUser))
	}
})
