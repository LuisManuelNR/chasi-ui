<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import type { Rule } from './rules'
	import CLabel from './CLabel.svelte'
	import CIcon from '../CIcon/CIcon.svelte'
	import { scale } from 'svelte/transition'
	import {
		mdiCheckboxBlankOutline,
		mdiCheckboxMarked,
		mdiRadioboxBlank,
		mdiRadioboxMarked
	} from '@mdi/js'

	type AllowedTypes = 'checkbox' | 'radio'

	interface $$Props extends HTMLInputAttributes {
		label?: string
		loading?: boolean
		rules?: Rule[]
		type?: AllowedTypes
		group?: any
		value?: any
		checked?: boolean
	}

	export let label = ''
	export let loading = false
	export let rules: Rule[] = []

	export let value: any = ''
	export let checked = false
	export let type: AllowedTypes = 'checkbox'
	export let group: any = type === 'checkbox' ? [] : ''

	$: type === 'radio' && updateRadio(group, value)

	$: type === 'checkbox' && group && updateChekbox(group, value)
	$: type === 'checkbox' && group && updateGroup(checked, value)

	function updateRadio(g: typeof group, v: typeof value) {
		checked = g === v
	}

	function updateChekbox(g: typeof group, v: typeof value) {
		checked = g.indexOf(v) >= 0
	}

	function updateGroup(c: typeof checked, v: typeof value) {
		const index = group.indexOf(v)
		if (c) {
			if (index < 0) {
				group = [...group, v]
			}
		} else {
			if (index >= 0) {
				const cloneG = group
				cloneG.splice(index, 1)
				group = cloneG
			}
		}
	}
</script>

<CLabel
	{label}
	{loading}
	disabled={$$restProps.disabled}
	values={{ value, valueAsDate: null, valueAsNumber: NaN, files: null, checked }}
	{rules}
	isToggle
>
	{#if checked}
		<div class="icon secondary-text" in:scale={{ duration: 100, start: 0.7 }}>
			<CIcon icon={type === 'checkbox' ? mdiCheckboxMarked : mdiRadioboxMarked} />
		</div>
	{:else}
		<div class="icon" in:scale={{ duration: 100, start: 0.7 }}>
			<CIcon icon={type === 'checkbox' ? mdiCheckboxBlankOutline : mdiRadioboxBlank} />
		</div>
	{/if}
	<slot name="prepend" slot="prepend" />
	{#if type === 'radio'}
		<input type="radio" {value} bind:group {...$$restProps} on:change />
	{:else}
		<input type="checkbox" {value} bind:checked {...$$restProps} on:change />
	{/if}
	<slot name="append" slot="append" />
</CLabel>

<style>
	.icon {
		grid-area: I;
		display: flex;
	}
	input {
		position: absolute;
		inset: 0;
		opacity: 0;
		cursor: inherit;
	}
</style>
