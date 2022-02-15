import { writable } from 'svelte/store'
import { NotificationTypes } from '$lib/types.d'

const initialNotification = { type: NotificationTypes.ERROR, text: '' }

export const notification = writable(initialNotification)

const defaultError = 'Oops, something went wrong..'
const defaultMessage = 'Something happened!'

export const setError = (errorMessage: string) => {
	notification.set({
		type: NotificationTypes.ERROR,
		text: errorMessage || defaultError
	})
}

export const setMessage = (message: string) => {
	notification.set({
		type: NotificationTypes.SUCCESS,
		text: message || defaultMessage
	})
}

export const setInitial = () => notification.set(initialNotification)
