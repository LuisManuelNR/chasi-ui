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
		value?: string | null | undefined
	}

	export let label = ''
	export let loading = false
	export let rules: Rule[] = []

	export let value: any = undefined
	export let type: AllowedTypes = 'text'
	export let placeholder: string | null | undefined = undefined

	$: activeLabel = type === 'date' || type === 'file' || Boolean(placeholder || value)

	function onInput(e: Event) {
		const input = e.target as HTMLInputElement
		value = type === 'number' ? +input.value : input.value
	}
</script>

<CLabel
	{label}
	{loading}
	active={activeLabel}
	disabled={$$restProps.disabled}
	values={{ value, checked: false }}
	{rules}
>
	<slot name="prepend" slot="prepend" />
	<input
		class="input-ctrl"
		{type}
		value={value || ''}
		{placeholder}
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
