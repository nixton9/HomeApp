<script lang="ts">
	export let checked: boolean
	export let onChange: (val: boolean) => void

	const handleToggleChange = (e) => {
		const target = e.target as HTMLInputElement
		onChange(target.checked)
	}
</script>

<div class="toggle">
	<div class="toggle-switch-container">
		<label class="toggle-switch">
			<input type="checkbox" {checked} on:change={handleToggleChange} />
			<span class="slider" />
		</label>
	</div>
</div>

<style>
	.toggle-switch {
		position: relative;
		display: inline-block;
		width: 3.5rem;
		height: 2rem;
	}

	.toggle-switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: var(--color-black-400);
		border-radius: 3.4rem;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 2rem;
		width: 2rem;
		left: 0;
		bottom: 03;
		background-color: var(--color-grey-600);
		border-radius: 50%;
		transition: all 0.4s ease;
	}

	input:checked + .slider:before {
		background-color: var(--color-green);
		transform: translateX(1.5rem);
	}
</style>
