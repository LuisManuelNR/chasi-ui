<script lang="ts">
	import { getContext } from 'svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { InputRule, InputRuleValidator } from './types.js'
	import type { Action } from 'svelte/action'

	type Props = {
		valueAsDate?: Date | null
		valueAsNumber?: number
		rules?: InputRule[]
		loading?: boolean
		label?: string
	} & HTMLInputAttributes

	let {
		value = $bindable(null),
		checked = $bindable(false),
		rules = [],
		valueAsDate,
		valueAsNumber,
		loading = false,
		label,
		...rest
	}: Props = $props()

	let error = $state('')

	const validator = getContext<Set<InputRuleValidator>>('validators')

	const setup: Action<HTMLInputElement> = (input) => {
		async function validate() {
			if (!rules.length) return error
			error = ''
			for (const rule of rules) {
				const msg = await rule(input)
				if (typeof msg === 'string') {
					error = msg
					break
				}
			}
			return error
		}
		if (validator) validator.add(validate)
		const inputHandler = updateValue(input, validate)
		input.addEventListener('input', inputHandler)
		return {
			destroy() {
				input.removeEventListener('input', inputHandler)
				validator.delete(validate)
			}
		}
	}

	function updateValue(input: HTMLInputElement, validate: () => Promise<string>) {
		return async () => {
			await validate()
			value = input.value
			checked = input.checked
			valueAsDate = input.valueAsDate
			valueAsNumber = input.valueAsNumber
		}
	}
</script>

<label class="c-input" class:error-state={!!error} class:loading-inline={loading}>
	{#if label || error}
		<span class="f-size-00">
			{label}
			{#if error}
				<span class="error-text">{error}</span>
			{/if}
		</span>
	{/if}
	<input {value} {checked} {...rest} use:setup />
</label>

<style>
	.c-input {
		--accent-color: transparent;
		display: inline-grid;
		vertical-align: middle;
		position: relative;
		height: 47px;
		background-color: var(--s-6);
		padding-block: 0.1rem;
		padding-inline: 0.5rem;
		border-radius: var(--size-1);
		border-bottom: 2px solid var(--accent-color);
		transition-property: border, background;
		transition-duration: 150ms;
		&:focus-within {
			--accent-color: var(--accent);
		}
	}
	.error-state {
		--accent-color: color-mix(in srgb, var(--error) 90%, transparent) !important;
	}
	.hint {
		position: absolute;
		top: 0;
		translate: 0.5rem -50%;
		z-index: 1;
		font-weight: 500;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: calc(100% - 1rem);
	}
</style>
