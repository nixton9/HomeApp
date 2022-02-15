<script lang="ts">
	import { user } from '$stores/user'

	let userName: string = ''

	user.subscribe((newUser) => {
		if (newUser.name) {
			userName = newUser.name
		}
	})
</script>

<h2>Welcome {userName}!</h2>

<style>
	h2 {
		font-size: 2.2rem;
		font-weight: var(--font-weight-bold);
	}
</style>
