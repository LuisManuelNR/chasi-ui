<script lang="ts">
	import type { Rule } from '$lib'
	import { getContext, onMount } from 'svelte'

	export let label = ''
	export let loading = false
	export let rules: Array<Rule<any>> | undefined = undefined
	let klass = ''
	export { klass as class }

	let hint = ''
	let shake = false
	let value = ''

	const formValidator = getContext<Set<() => void> | undefined>('validators')

	function handleInputEvent(e: any) {
		if (!rules?.length) return
		if (e instanceof CustomEvent) value = e.detail
		else if (e.target instanceof HTMLInputElement) {
			if (e.target.type === 'checkbox' || e.target.type === 'radio') value = e.target.checked
			else value = e.target.value
		}
		validate(value)
	}

	export function validate(v: any) {
		if (!rules?.length) return true
		let ilegal: string | true
		hint = ''
		for (let i = 0; i < rules.length; i++) {
			if (typeof rules[i] !== 'function') return true
			ilegal = rules[i](v)
			if (ilegal !== true) {
				hint = ilegal
				return hint
			}
		}
	}

	function toValidaror() {
		validate(value)
		if (hint) shake = true
		return hint
	}

	function appendRuleToForm() {
		if (formValidator) {
			formValidator.add(toValidaror)
			return () => formValidator.delete(toValidaror)
		}
	}

	onMount(() => {
		return appendRuleToForm()
	})
</script>

<label
	class="c-label {klass}"
	class:loading-inline={loading}
	class:no-label={!label}
	class:error-state={hint}
	class:shake-animation={shake}
	on:animationend={() => (shake = false)}
	on:input={handleInputEvent}
>
	<div class="label-text">
		<slot name="label">
			{label}
		</slot>
	</div>
	<div class="prepend">
		<slot name="prepend" />
	</div>
	<div class="input-ctrl">
		<slot />
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
			grid-template-rows: auto 1fr;
			grid-template-areas: 'P L A' 'P I A';
			height: 48px;
			padding-inline: var(--size-2);

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
				padding-inline: 0;
				min-height: auto;
				.prepend:not(:empty) {
					margin-right: var(--size-2);
				}
				.label-text {
					cursor: inherit;
					white-space: initial;
					font-size: 0.9rem;
				}
				&:not(&.error-state) {
					--border-color-input: transparent;
				}
			}
			&:has(textarea) {
				height: auto;
				min-height: 48px;
			}

			.label-text {
				grid-area: L;
				user-select: none;
				pointer-events: none;
				cursor: text;
				white-space: nowrap;
				font-size: 0.9rem;
				opacity: 0.85;
				line-height: normal;
				text-overflow: ellipsis;
				overflow: hidden;
				padding-top: 2px;
			}

			.hint {
				color: var(--text-color-input);
				user-select: none;
				pointer-events: none;
				position: absolute;
				font-size: 0.9rem;
				top: 100%;
				z-index: 1;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
				text-wrap: nowrap;
				border-radius: inherit;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				transition: all 150ms ease;
				padding-inline: var(--size-2);
				font-weight: 500;
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
