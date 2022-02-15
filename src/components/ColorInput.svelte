<script lang="ts">
	export let value: string | null
	export let onChange: (val: string) => void
	export let isFullWidth: boolean = false

	const handleInputChange = (e) => {
		onChange(e.target.value)
	}
</script>

<div class="color-input">
	<label>
		<div
			class="color-preview {isFullWidth ? 'full-width' : ''} {!value ? 'no-value' : ''}"
			style="background-color: {value || '#ffffff'}"
		/>
		<input type="color" id="colorinput" {value} on:change={handleInputChange} />
	</label>
</div>

<style lang="scss">
	.color-preview {
		position: relative;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;

		&.full-width {
			width: 100%;
			height: 4.2rem;
			border-radius: var(--main-border-radius);
		}

		&.no-value:after {
			content: '';
			width: 125%;
			height: 3px;
			position: absolute;
			top: 0;
			left: 2px;
			transform: rotate(45deg);
			transform-origin: top left;
			background: var(--color-red);
		}
	}

	input {
		position: absolute;
		opacity: 0;
	}
</style>
