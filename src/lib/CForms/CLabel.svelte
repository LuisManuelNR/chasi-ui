<script lang="ts">
	import { getContext, onDestroy } from 'svelte'
	import type { Rule, RuleParams, FormValidator } from './rules'

	export let label = ''
	export let loading = false
	export let rules: Rule[] = []
	export let active = false
	export let disabled = false
	export let values: RuleParams
	export let isToggle = false

	let CLabel: HTMLLabelElement
	let hint = ''
	let shake = false

	$: validate(values)

	// if this input is inside a form, register this rules, so when the form is submitted can be validated
	const formValidator = getContext<FormValidator[]>('validators')
	if (formValidator) formValidator.push(validatorFunc)

	async function validate(vls: RuleParams) {
		if (!CLabel) return
		let ilegal: string | true = ''
		if (rules && rules.length) {
			for (let i = 0; i < rules.length; i++) {
				ilegal = await rules[i](vls)
				if (ilegal !== true) {
					break
				}
			}
		}
		hint = ilegal !== true ? ilegal : ''
	}

	async function validatorFunc() {
		await validate(values)
		if (hint) {
			CLabel.addEventListener('animationend', () => (shake = false), { once: true })
			shake = true
		}
		return hint
	}

	onDestroy(() => {
		if (formValidator) {
			// unregister from a form on destroy
			const index = formValidator.indexOf(validatorFunc)
			if (index > -1) {
				formValidator.splice(index, 1)
			}
		}
	})
</script>

<label
	class="c-label"
	class:loading-inline={loading}
	class:active
	class:no-label={!label}
	class:disabled
	class:error-state={hint}
	class:shake-animation={shake}
	class:is-toggle={isToggle}
	bind:this={CLabel}
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
	.c-label {
		--border-color-input: hsla(0, 0%, 50%, 0.5);
		--translate-label: 0px, 9px;
		--scale-label: 1;
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

		&.active,
		&:focus-within {
			--translate-label: 0px, 0px;
			--scale-label: 0.8;
		}

		&:has(input:-webkit-autofill) {
			--translate-label: 0px, 0px;
			--scale-label: 0.8;
		}

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
		&.disabled {
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
			--translate-label: 0px, 0px;
			--scale-label: 1;
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
			transform: translate(var(--translate-label)) scale(var(--scale-label));
			transition: all 170ms;
			color: var(--on-n-100);
			transform-origin: left center;
			cursor: text;
			white-space: nowrap;
			will-change: transform;
			backface-visibility: hidden;
			font-size: 1.1rem;
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
