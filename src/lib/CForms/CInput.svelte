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

	let hint = $state('')

	const validator = getContext<Set<InputRuleValidator>>('validators')

	const setup: Action<HTMLInputElement> = (input) => {
		async function validate() {
			if (!rules.length) return hint
			for (const rule of rules) {
				hint = await rule(input)
				if (hint) break
			}
			return hint
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

<label class="c-label" class:loading-inline={loading}>
	{label}
	<input {value} {checked} {...rest} use:setup />
</label>
<p class="error-text">{hint}</p>

<style>
	.c-label {
		display: inline-block;
		gap: 1rem;
		background-color: color(from var(--bg) srgb calc(r * 0.8) calc(g * 0.8) calc(b * 0.8));
		padding: 0.5rem;
		border-radius: 0.3rem;
	}
</style>
