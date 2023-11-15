<script lang="ts">
	import type { Action } from 'svelte/action'
	import type { Rule } from './rules.js'
	import { getContext } from 'svelte'

	export let label = ''
	export let loading = false

	let hint = ''
	let shake = false

	const formValidator = getContext<Set<() => string | undefined> | undefined>('validators')

	const rules: Action<HTMLInputElement | HTMLTextAreaElement, Rule[]> = (input, fns) => {
		const vfunc = validator(fns, input)
		if (formValidator) {
			formValidator.add(vfunc)
		}
		const validationProcess = validate(fns, input)
		//@ts-ignore
		const { get, set } = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
		Object.defineProperty(input, 'value', {
			get() {
				return get.call(this)
			},
			set(newVal) {
				set.call(this, newVal)
				input.dispatchEvent(new Event('input', { bubbles: true }))
			}
		})
		input.addEventListener('input', validationProcess)
		return {
			destroy() {
				if (formValidator) {
					formValidator.delete(vfunc)
				}
				input.removeEventListener('input', validationProcess)
			}
		}
	}

	function validator(rules: Rule[], input: HTMLInputElement | HTMLTextAreaElement) {
		return () => {
			if (input) {
				validate(rules, input)()
				if (hint) shake = true
				return hint
			}
		}
	}

	function validate(r: Rule[], input: HTMLInputElement | HTMLTextAreaElement) {
		return () => {
			let ilegal: string | true = ''
			if (r.length) {
				for (let i = 0; i < r.length; i++) {
					ilegal = r[i](input.value)
					if (ilegal !== true) {
						break
					}
				}
			}
			hint = ilegal !== true ? ilegal : ''
		}
	}
</script>

<label
	class="c-label"
	class:loading-inline={loading}
	class:no-label={!label}
	class:error-state={hint}
	class:shake-animation={shake}
	on:animationend={() => (shake = false)}
>
	<div class="label-text">
		{label}
	</div>
	<div class="prepend">
		<slot name="prepend" />
	</div>
	<div class="input-ctrl">
		<slot {rules} />
	</div>
	<div class="append">
		<slot name="append" />
	</div>
	<span class="hint">{hint}</span>
</label>

<style lang="scss">
	@layer ChasiLabel {
		.c-label {
			--border-color-input: var(--s-6);
			border-bottom: 2px solid var(--border-color-input);
			background-color: var(--s-5);
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

			&:focus-within {
				--border-color-input: var(--accent);
			}
			&:has(:focus-visible) {
				--text-color-input: var(--accent);
			}

			&.no-label {
				grid-template-areas: 'P I A';
				grid-template-rows: 1fr;
				.label-text {
					display: none;
				}
			}
			&:has(input[disabled]) {
				cursor: not-allowed;
				color: hsla(0, 0%, 50%, 0.5);
				background-color: hsla(0, 0%, 50%, 0.1);
				--text-color-input: currentColor;
				--border-color-input: currentColor;
				.label-text {
					color: hsla(0, 0%, 50%, 0.8);
				}
			}
			&.error-state {
				--text-color-input: var(--error);
				--border-color-input: var(--error);
			}

			&:has(input[type='radio'], input[type='checkbox']) {
				background-color: transparent;
				grid-template-columns: auto auto 1fr auto;
				grid-template-rows: auto;
				grid-template-areas: 'P I L A';
				align-items: center;
				gap: 0;
				padding-inline: 0;
				.prepend:not(:empty) {
					margin-right: var(--size-2);
				}
				.label-text {
					font-size: 1.1rem;
					cursor: inherit;
				}
				&:not(&.error-state) {
					--border-color-input: transparent;
				}
			}

			.label-text {
				grid-area: L;
				user-select: none;
				pointer-events: none;
				cursor: text;
				white-space: nowrap;
				font-size: 1rem;
				opacity: 0.85;
			}

			.hint {
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
			.prepend {
				grid-area: P;
				display: grid;
				place-content: center;
			}
			.append {
				grid-area: A;
				display: grid;
				place-content: center;
			}
			.input-ctrl {
				grid-area: I;
				display: flex;
				align-items: center;
				justify-content: center;
				:global(textarea),
				:global(select),
				:global(input) {
					border: none;
					outline: none;
					width: 100%;
					font-size: 1.1rem;
					font-family: inherit;
					background-color: transparent;
					color: var(--on-s-1);
					min-width: 4.5ch;
					&:-webkit-autofill {
						-webkit-box-shadow: 0 0 0 30px var(--s-5) inset;
					}
					&::placeholder {
						color: hsla(0, 0%, 50%, 0.9);
					}
					&:disabled {
						color: inherit;
						cursor: inherit;
					}
				}
				:global([type='checkbox']) {
					width: var(--size-4);
					height: var(--size-4);
					min-width: var(--size-4);
					margin-right: var(--size-2);
				}
				:global([type='radio']) {
					width: var(--size-4);
					height: var(--size-4);
					min-width: var(--size-4);
					margin-right: var(--size-2);
				}
			}
		}
	}
</style>
