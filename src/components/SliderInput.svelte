<script lang="ts">
	export let value: number
	export let onChange: (val: number) => void
	export let min: number = 0
	export let max: number = 100

	const handleInputChange = (e) => {
		onChange(parseInt(e.target.value))
	}
</script>

<div class="slider-input">
	<input type="range" {min} {max} {value} on:change={handleInputChange} />
</div>

<style>
	.slider-input {
		width: 100%;
	}

	input {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.7rem;
		background: var(--color-black-400);
		outline: none;
		border-radius: 2.5rem;
	}

	input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 1.8rem;
		height: 1.8rem;
		background: var(--color-grey-600);
		cursor: pointer;
		border-radius: 50%;
	}
</style>
