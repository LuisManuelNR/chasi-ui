<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements'
	import type { Rule } from './rules'
	import CLabel from './CLabel.svelte'

	interface $$Props extends HTMLTextareaAttributes {
		label?: string
		loading?: boolean
		rules?: Rule[]
		autogrow?: boolean
		value?: string
	}

	export let label = ''
	export let loading = false
	export let rules: Rule[] = []
	export let autogrow = false

	export let value: string = ''
	export let placeholder = ''
	export let rows = 6

	$: activeLabel = Boolean(placeholder || value)

	function onInput(e: Event) {
		const input = e.target as HTMLTextAreaElement
		value = input.value
		if (autogrow && input.scrollHeight !== input.clientHeight) {
			input.style.height = `${input.scrollHeight}px`
		}
	}
</script>

<CLabel
	{label}
	{loading}
	active={activeLabel}
	disabled={$$restProps.disabled}
	values={{ value, valueAsDate: null, valueAsNumber: null, files: null, checked: false }}
	{rules}
>
	<slot name="prepend" slot="prepend" />
	<textarea
		class="input-ctrl"
		{value}
		{placeholder}
		{rows}
		{...$$restProps}
		on:input={onInput}
		on:input
		on:change
		on:click
		on:keydown
	/>
	<slot name="append" slot="append" />
</CLabel>
