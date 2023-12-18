<script lang="ts">
	import type { Rule } from '$lib'
	import { CLabel, CIcon, CDialog } from '$lib'
	import { mdiChevronDown, mdiMagnify } from '@mdi/js'
	import { isEqual } from '$lib/utils.js'
	import { BROWSER } from 'esm-env'
	import { createEventDispatcher, tick } from 'svelte'

	type T = $$Generic
	type X = T extends Record<string, any> ? keyof T : undefined
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
	export let selected: (v: T) => boolean = (v) => isEqual(v, value)

	let dialog = false
	let cursor = -1
	let fitlerValue = ''
	let inputElement: HTMLInputElement
	let virtualList = items
	const dispatch = createEventDispatcher<{ 'select-item': T }>()

	async function onListChange(list: T[]) {
		virtualList = list
		if (list && list.length) {
			const finded = list.find(selected)
			if (finded) {
				setValue(finded)
			} else {
				setValue(undefined)
			}
		}
	}

	let dirty = false
	async function setValue(val?: T) {
		value = val
		dialog = false
		if (value) {
			dispatch('select-item', value)
		}
		if (dirty && inputElement && rules && rules.length) {
			await tick()
			inputElement.dispatchEvent(new CustomEvent('input', { bubbles: true, detail: value }))
		}
		dirty = true
	}

	function filterList() {
		cursor = -1
		if (!filterBy) return (virtualList = items)
		virtualList = items.filter((v) => {
			//@ts-ignore
			const value = `${v[filterBy] || v}`
			const a = normalizeItems(value)
			const b = normalizeItems(fitlerValue)
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
		if (!items.length) return
		cursor = -1
		fitlerValue = ''
		virtualList = items
		dialog = true
		focusElement(filterBy ? '#c-select-filter' : '.selected')
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

	//@ts-ignore
	$: BROWSER && selected && onListChange(items)
	$: BROWSER && fitlerValue && filterList()
</script>

<div class="c-select">
	<slot name="input-ctrl" open={openSelect}>
		<CLabel {label} {loading} {rules}>
			<button
				class="text-left full-width d-flex align-center gap-2"
				{disabled}
				on:click={openSelect}
			>
				{#if items.length}
					{#if value}
						<slot item={value} isList={false}>
							{value}
						</slot>
					{:else}
						<span class="info-text">{placeholder}</span>
					{/if}
				{:else}
					<span class="info-text">{noDataText}</span>
				{/if}
			</button>
			<input hidden bind:this={inputElement} />
			<svelte:fragment slot="append">
				<CIcon icon={mdiChevronDown} />
			</svelte:fragment>
		</CLabel>
	</slot>

	{#if items.length && virtualList}
		<CDialog bind:active={dialog}>
			<div slot="header" class="mb-2">
				{#if filterBy}
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
			</div>
		</CDialog>
	{/if}
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
	.info-text {
		opacity: 0.6;
	}
</style>
