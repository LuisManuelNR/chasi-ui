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
	<small>{text} <span class="hint">{error}</span></small>
	{@render children?.()}
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

		grid-template-columns: auto 1fr auto;
		grid-template-areas: 'pre label post' 'pre input post';

		&:focus-within {
			--accent-color: var(--accent);
		}
	}

	.error-state {
		--accent-color: var(--error);
	}

	:global {
		.c-label > :has(+ input) {
			grid-area: pre;
			align-self: center;
		}
		.c-label > input {
			grid-area: input;
		}
		.c-label > input + * {
			grid-area: post;
			align-self: center;
		}
	}

	small {
		grid-area: label;
	}

	.hint {
		font-weight: 500;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: inherit;
		color: var(--error);
	}
</style>
