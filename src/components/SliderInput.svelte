<script lang="ts">
	export let value: number
	export let onChange: (val: number) => void
	export let min: number = 0
	export let max: number = 100
	export let isDisabled: boolean = false

	const handleInputChange = (e) => {
		onChange(parseInt(e.target.value))
	}
</script>

<div class="slider-input {isDisabled ? 'disabled' : ''}">
	<input type="range" {min} {max} {value} on:change={handleInputChange} disabled={isDisabled} />
</div>

<style lang="scss">
	.slider-input {
		width: 100%;

		&:hover input::-webkit-slider-thumb,
		&:active input::-webkit-slider-thumb {
			background: var(--color-grey-400);
		}
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
		transition: background 0.3s ease;
	}

	.disabled {
		opacity: 0.2;

		input::-webkit-slider-thumb {
			cursor: default;
		}
	}
</style>
