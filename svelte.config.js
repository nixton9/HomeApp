import preprocess from 'svelte-preprocess'
import vercel from '@sveltejs/adapter-vercel'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		vite: {
			resolve: {
				alias: {
					$components: resolve('./src/components'),
					$icons: resolve('./src/components/icons'),
					$utils: resolve('./src/utils'),
					$stores: resolve('./src/stores')
				}
			}
		}
	}
}

export default config
