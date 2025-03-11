<script lang="ts">
	import { getContext, type Snippet } from 'svelte'
	import type { InputRule, InputRuleValidator } from './index.js'
	import type { Action } from 'svelte/action'

	type Props = {
		text?: string
		rules?: InputRule[]
		loading?: boolean
		children?: Snippet
	}

	let { text, rules = [], loading = false, children }: Props = $props()

	let error = $state('')

	const validator = getContext<Set<InputRuleValidator>>('validators')

	const setup: Action<HTMLLabelElement> = (label) => {
		const input = label.querySelector<HTMLInputElement>('input')
		if (!input) return
		async function validate() {
			if (!rules.length) return error
			error = ''
			for (const rule of rules) {
				const msg = await rule(input!)
				if (typeof msg === 'string') {
					error = msg
					break
				}
			}
			return error
		}
		if (validator) validator.add(validate)
		input.addEventListener('input', validate)
		return {
			destroy() {
				input.removeEventListener('input', validate)
				validator && validator.delete(validate)
			}
		}
	}
</script>

<label class="c-label" class:error-state={!!error} class:loading-inline={loading} use:setup>
	<small class="text">{text}</small>
	{@render children?.()}
	<small class="hint">{error}</small>
</label>

<style>
	.c-label {
		--accent-color: transparent;
		display: inline-grid;
		align-items: baseline;
		column-gap: 0.5rem;
		vertical-align: middle;
		position: relative;
		min-height: 42px;
		background-color: var(--s-6);
		padding-block: 0.1rem;
		padding-inline: 0.5rem;
		border-radius: var(--size-1);
		border-bottom: 2px solid var(--accent-color);
		transition-property: border, background;
		transition-duration: 150ms;

		grid-template-columns: auto auto 1fr auto;
		grid-template-areas: 'P L H A' 'P I I A';

		&:focus-within {
			--accent-color: var(--accent);
		}

		&.error-state {
			--accent-color: var(--error);
		}
	}

	:global {
		.c-label {
			&:has([disabled]) {
				cursor: not-allowed;
				color: var(--s-4);
			}
			&:has(input[type='radio'], input[type='checkbox']) {
				justify-items: start;
				justify-content: start;
				align-items: center;
				/* grid-template-columns: auto auto 1fr auto; */
				grid-auto-flow: column;
				/* grid-template-areas: 'P I L A' 'P H H A'; */
				/* display: inline-flex; */
				/* align-items: center; */
			}
			input[type='radio'],
			input[type='checkbox'] {
				width: var(--size-3);
				height: var(--size-3);
				min-width: var(--size-3);
			}
		}
		.c-label > :has(+ input) {
			grid-area: P;
			align-self: center;
		}
		.c-label > input {
			grid-area: I;
		}
		.c-label > input + * {
			grid-area: A;
			align-self: center;
		}
	}

	.text {
		grid-area: L;
		user-select: none;
	}

	.hint {
		grid-area: H;
		font-weight: 500;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: inherit;
		color: var(--error);
	}
</style>
