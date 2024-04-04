<script lang="ts">
	import type { Rule } from '$lib'
	import { CLabel, CIcon, CDialog } from '$lib'
	import { mdiChevronDown, mdiMagnify } from '@mdi/js'
	import { BROWSER } from 'esm-env'
	import { createEventDispatcher, tick } from 'svelte'

	type T = $$Generic
	type X = T extends Record<string, any> ? keyof T : undefined

	interface $$Slots {
		default: { item: T; isList: boolean }
		'input-ctrl': { open: () => void }
	}

	export let items: T[] = []
	export let value: T | undefined = undefined
	export let label = ''
	export let rules: Array<Rule<T>> | undefined = undefined
	export let loading = false
	export let disabled = false
	export let noDataText = 'No hay datos disponibles'
	export let placeholder = ''
	// @ts-ignore
	export let filterBy: X | boolean = false
	export let onSelect: (v: T) => void = () => {}

	let dialog = false
	let cursor = -1
	let fitlerValue = ''
	let inputElement: HTMLInputElement
	let virtualList = items
	const dispatch = createEventDispatcher<{ open: null }>()

	async function bubleValue(v: any) {
		if (inputElement && rules && rules.length) {
			await tick()
			//@ts-ignore
			inputElement.value = v
			inputElement.dispatchEvent(new InputEvent('input', { bubbles: true }))
		}
	}

	async function setValue(val?: T) {
		value = val
		dialog = false
		if (value) {
			onSelect(value)
		}
	}

	function filterList(val: string, list: T[]) {
		cursor = -1
		if (!filterBy) return (virtualList = list)
		virtualList = list.filter((v) => {
			//@ts-ignore
			const value = `${v[filterBy] || v}`
			const a = normalizeItems(value)
			const b = normalizeItems(val)
			return a.includes(b)
		})
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (disabled || !virtualList) return
		const kUp = e.code === 'ArrowUp'
		const kDown = e.code === 'ArrowDown'
		const intro = e.code === 'Enter'
		if (intro) {
			e.stopPropagation()
			e.preventDefault()
			setValue(virtualList[cursor])
		}
		if (!kUp && !kDown && !intro) {
			focusElement('#c-select-filter')
		}
		if (kUp) {
			e.stopPropagation()
			e.preventDefault()
			cursor -= cursor <= 0 ? -virtualList.length + 1 : 1
			focusElement('.selected')
		}
		if (kDown) {
			e.stopPropagation()
			e.preventDefault()
			cursor += cursor === virtualList.length - 1 ? -virtualList.length + 1 : 1
			focusElement('.selected')
		}
	}

	function openSelect() {
		cursor = -1
		fitlerValue = ''
		virtualList = items
		dialog = true
		focusElement(filterBy ? '#c-select-filter' : '.selected')
		dispatch('open')
	}

	function normalizeItems(str: string) {
		return str
			.trim()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036F]/g, '')
	}

	async function focusElement(selector: string) {
		await tick()
		await tick()
		const _selector = `dialog[open] ${selector}`
		const currentBtn = document.querySelector(_selector) as HTMLElement
		if (currentBtn) currentBtn.focus()
	}

	$: BROWSER && filterList(fitlerValue, items)
	$: BROWSER && bubleValue(value)
</script>

<div class="c-select">
	<slot name="input-ctrl" open={openSelect}>
		<CLabel {label} {loading} {rules}>
			<button
				class="text-left full-width d-flex align-center gap-2"
				type="button"
				{disabled}
				on:click={openSelect}
			>
				{#if value}
					<slot item={value} isList={false}>
						{value}
					</slot>
				{:else}
					<span class="placeholder">{placeholder}</span>
				{/if}
			</button>
			<c-select-value bind:this={inputElement} />
			<svelte:fragment slot="append">
				<CIcon icon={mdiChevronDown} />
			</svelte:fragment>
		</CLabel>
	</slot>

	<CDialog bind:active={dialog}>
		<div slot="header">
			{#if filterBy && items.length}
				<CLabel>
					<svelte:fragment slot="prepend">
						<CIcon icon={mdiMagnify}></CIcon>
					</svelte:fragment>
					<input
						id="c-select-filter"
						autocomplete="off"
						bind:value={fitlerValue}
						on:keydown={handleKeyDown}
						type="search"
					/>
				</CLabel>
			{/if}
		</div>
		<div class="item-list">
			{#if virtualList && virtualList.length}
				{#each virtualList as item, i}
					<button
						class="list-item full-width"
						class:selected={cursor === i}
						on:click={() => setValue(item)}
						on:keydown={handleKeyDown}
					>
						<slot {item} isList={true}>
							{item}
						</slot>
					</button>
				{/each}
			{:else}
				<span class="d-flex justify-center">{noDataText}</span>
			{/if}
		</div>
	</CDialog>
</div>

<style>
	.c-select {
		--dialog-max-width: 40ch;
	}
	.item-list {
		overflow-y: auto;
		overflow-x: hidden;
	}
	.list-item {
		white-space: normal;
		text-align: left;
	}
	.placeholder {
		opacity: 0.6;
	}
	c-select-value {
		display: none;
	}
</style>
