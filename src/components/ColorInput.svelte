<script lang="ts">
	import { debounce } from '$utils/helpers'

	export let value: string | null
	export let onChange: (val: string) => void
	export let isDisabled: boolean = false
	export let isFullWidth: boolean = false

	const handleInputChange = debounce((e) => onChange(e.target.value))

	$: previewClassNames = `color-preview contrast-hover ${isDisabled ? 'disabled' : ''} ${
		isFullWidth ? 'full-width' : ''
	} ${!value ? 'no-value' : ''}`
</script>

<div class="color-input">
	<label>
		<div class={previewClassNames} style="background-color: {value || 'var(--color-black'}" />
		<input
			type="color"
			id="colorinput"
			{value}
			on:change={handleInputChange}
			disabled={isDisabled}
		/>
	</label>
</div>

<style lang="scss">
	.color-preview {
		position: relative;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;

		&.disabled {
			opacity: 0.1;
			cursor: default;
		}

		&.full-width {
			width: 100%;
			height: 4.2rem;
			border-radius: var(--main-border-radius);
		}

		&.no-value:after {
			content: '';
			width: 125%;
			height: 4px;
			position: absolute;
			top: 0;
			left: 2px;
			transform: rotate(45deg);
			transform-origin: top left;
			background: var(--grey-gradient);
		}
	}

	input {
		position: absolute;
		opacity: 0;
	}
</style>
