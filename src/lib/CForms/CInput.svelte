<script lang="ts">
	import { getContext } from 'svelte'
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { InputRule, InputRuleValidator, ValidatorInput } from './types.js'
	import type { Action } from 'svelte/action'

	type Props = {
		name: string
		valueAsDate?: Date | null
		valueAsNumber?: number
		rules?: InputRule[]
	} & HTMLInputAttributes

	let {
		name,
		value = $bindable(null),
		checked = $bindable(false),
		rules = [],
		valueAsDate,
		valueAsNumber,
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

<input {name} {value} {checked} {...rest} use:setup />
<p class="error-text">{hint}</p>

<style>
	input {
		background-color: var(--s-1);
	}
</style>
