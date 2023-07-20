<script lang="ts">
	export let label = ''
	export let loading = false
	export let disabled = false

	let hint = ''
	let shake = false
</script>

<label
	class="c-label"
	class:loading-inline={loading}
	class:no-label={!label}
	class:disabled
	class:error-state={hint}
	class:shake-animation={shake}
>
	<div class="label-text">
		{label}
	</div>
	<div class="prepend">
		<slot name="prepend" />
	</div>
	<slot />
	<div class="append">
		<slot name="append" />
	</div>
	<span class="hint">{hint}</span>
</label>

<style lang="scss">
	:where(.c-label) {
		--border-color-input: var(--n-300);
		border-bottom: 2px solid var(--border-color-input);
		background-color: var(--n-400);
		color: var(--text-color-input, inherit);
		border-radius: var(--size-1);
		transition: all 0.2s;
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: 1.03rem 1fr;
		grid-template-areas: 'P L A' 'P I A';
		gap: 0.2rem;
		min-height: 48px;
		padding-inline: var(--size-1);
		isolation: isolate;

		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	inset: 0;
		// 	background-color: hsla(0, 0%, 50%, 0.5);
		// 	opacity: 0.1;
		// 	border-radius: inherit;
		// 	z-index: -1;
		// }

		&:focus-within {
			--text-color-input: var(--brand);
			--border-color-input: var(--brand);
		}

		&.no-label {
			grid-template-areas: 'P I A';
			grid-template-rows: 1fr;
			> .label-text {
				display: none;
			}
		}
		&:has(input[disabled]) {
			cursor: not-allowed;
			color: hsla(0, 0%, 50%, 0.5);
			--text-color-input: currentColor;
			--border-color-input: currentColor;
			> .label-text {
				color: hsla(0, 0%, 50%, 0.5);
			}
		}
		&.error-state {
			--text-color-input: var(--error);
			--border-color-input: var(--error);
		}

		&.is-toggle {
			background-color: transparent;
			grid-template-columns: auto auto 1fr auto;
			grid-template-rows: auto;
			grid-template-areas: 'I P L A';
			align-items: center;
			gap: 0.5rem;
			> .label-text {
				font-size: 1.1rem;
				cursor: inherit;
			}
			&:not(&.error-state) {
				--border-color-input: transparent;
			}
		}

		> .label-text {
			grid-area: L;
			user-select: none;
			pointer-events: none;
			color: var(--on-n-100);
			cursor: text;
			white-space: nowrap;
			backface-visibility: hidden;
			-webkit-font-smoothing: subpixel-antialiased;
			font-size: 1rem;
		}

		> .hint {
			color: var(--text-color-input);
			user-select: none;
			line-height: 1;
			position: absolute;
			bottom: -1.2rem;
			transform: translateZ(0);
			white-space: nowrap;
			font-size: 0.9rem;
			font-weight: 600;
		}
		:global(.prepend) {
			grid-area: P;
			display: grid;
			place-content: center;
		}
		:global(.append) {
			grid-area: A;
			display: grid;
			place-content: center;
		}
		> :global(.input-ctrl) {
			grid-area: I;
			border: none;
			outline: none;
			width: 100%;
			font-size: 1.1rem;
			font-family: inherit;
			background-color: transparent;
			color: var(--on-n-100);
			&:-webkit-autofill {
				-webkit-box-shadow: 0 0 0 30px var(--n-400) inset;
			}
			&::placeholder {
				color: hsla(0, 0%, 50%, 0.5);
			}
			&:disabled {
				color: hsla(0, 0%, 50%, 0.5);
				cursor: inherit;
			}
		}
	}
</style>
