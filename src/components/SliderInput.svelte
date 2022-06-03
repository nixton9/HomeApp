<script lang="ts">
	import { getPercentage } from '$utils/helpers'

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
	<div class="input-background" style={`width: ${getPercentage(min, max, value)}%`} />
	<input type="range" {min} {max} {value} on:change={handleInputChange} disabled={isDisabled} />
</div>

<style lang="scss">
	.slider-input {
		position: relative;
		width: 100%;

		&:hover input::-webkit-slider-thumb,
		&:active input::-webkit-slider-thumb {
			background: var(--color-grey);
		}
	}

	.input-background {
		position: absolute;
		top: 50%;
		height: 0.7rem;
		background: var(--color-green);
		border-radius: 2.5rem;
		transform: translateY(-50%);

		&:after {
			content: '';
			background: rgba(105, 234, 173, 0.65);
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100%;
			height: 60%;
			z-index: -1;
			filter: blur(16px);
			transform: translate(-50%, -50%);
		}
	}

	input {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.7rem;
		background: var(--color-black);
		outline: none;
		border-radius: 2.5rem;
	}

	input::-webkit-slider-thumb {
		position: relative;
		-webkit-appearance: none;
		appearance: none;
		width: 1.8rem;
		height: 1.8rem;
		background: var(--color-grey);
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
