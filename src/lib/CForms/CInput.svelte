<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { Rule } from './rules'
	import CLabel from './CLabel.svelte'

	type AllowedTypes =
		| 'text'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'range'
		| 'search'
		| 'tel'
		| 'time'
		| 'url'
		| 'week'

	interface $$Props extends HTMLInputAttributes {
		label?: string
		loading?: boolean
		rules?: Rule[]
		type?: AllowedTypes
	}

	export let label = ''
	export let loading = false
	export let rules: Rule[] = []

	export let value: string | null = null
	export let valueAsDate: Date | null = null
	export let valueAsNumber: number = NaN
	export let files: FileList | null = null
	export let type: AllowedTypes = 'text'
	export let placeholder: string | null = ''

	let inputElement: HTMLInputElement | undefined

	$: activeLabel =
		type === 'date' ||
		type === 'file' ||
		Boolean(placeholder || value || valueAsDate || valueAsNumber)
	$: updateDate(valueAsDate)
	$: updateNumber(valueAsNumber)

	function onInput(e: Event) {
		const input = e.target as HTMLInputElement
		value = input.value
		valueAsDate = input.valueAsDate
		valueAsNumber = input.valueAsNumber
		files = input.files
	}

	function updateDate(d: typeof valueAsDate) {
		if (inputElement) inputElement.valueAsDate = d
	}
	function updateNumber(d: typeof valueAsNumber) {
		if (inputElement) inputElement.valueAsNumber = d
	}
</script>

<CLabel
	{label}
	{loading}
	active={activeLabel}
	disabled={$$restProps.disabled}
	values={{ value, valueAsDate, valueAsNumber, files, checked: false }}
	{rules}
>
	<slot name="prepend" slot="prepend" />
	<input
		class="input-ctrl"
		{type}
		{value}
		{files}
		{placeholder}
		bind:this={inputElement}
		on:input={onInput}
		on:input
		on:change
		on:click
		on:keydown
		{...$$restProps}
	/>
	<slot name="append" slot="append" />
</CLabel>

<style lang="scss">
	.icon {
		grid-area: I;
		display: flex;
	}
</style>
