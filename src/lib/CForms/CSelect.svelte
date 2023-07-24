<script lang="ts">
	import type { Rule } from './rules.js'
	import CLabel from './CLabel.svelte'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiChevronDown } from '@mdi/js'

	type T = $$Generic
	type X = T extends Record<string, any> ? keyof T : undefined
	export let label = ''
	export let items: T[] = []
	// @ts-ignore
	export let itemText: X = undefined
	// @ts-ignore
	export let itemValue: X = undefined
	export let value: any = ''
	export let rules: Rule[] = []
	export let loading = false
	export let filter = false
	export let disabled = false
	export let noDataText = 'No hay datos disponibles'

	let dialog: HTMLDialogElement
	let filteredItems: T[] = items
	let fitlerValue = ''
	let cursor = -1

	function open() {
		fitlerValue = ''
		cursor = -1
		dialog.showModal()
	}

	function selectItem(item: T) {
		return () => {
			// @ts-ignore
			value = itemValue && item instanceof Object ? item[itemValue] : item
			dialog.close()
			filteredItems = items
			fitlerValue = ''
		}
	}

	function onFilter() {
		filteredItems = items.filter((v: T) => {
			const toNormalize = itemText && v instanceof Object ? v[itemText] : v
			if (typeof toNormalize === 'string') {
				const a = normalizeItems(toNormalize)
				const b = normalizeItems(fitlerValue)
				return a.startsWith(b)
			}
			return v
		})
		cursor = filteredItems.length ? 0 : -1
	}
	function normalizeItems(str: string) {
		return str
			.trim()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036F]/g, '')
	}

	function handleKeyDown(el: 'select' | 'filter') {
		return (e: KeyboardEvent) => {
			if (disabled) return
			const kUp = e.code === 'ArrowUp'
			const kDown = e.code === 'ArrowDown'
			const kSpace = e.code === 'Space'
			const kTab = e.code === 'Tab'
			const kEnter = e.code === 'Enter'
			if (el === 'select' && (kSpace || kEnter)) {
				open()
				e.preventDefault()
				e.stopPropagation()
			}
			if (el === 'filter') {
				if (kTab) {
					e.stopPropagation()
					e.preventDefault()
					dialog.close()
				}
				if (kUp) {
					cursor -= cursor <= 0 ? -filteredItems.length + 1 : 1
					scrollItemSelectIntoView()
				}
				if (kDown) {
					cursor += cursor === filteredItems.length - 1 ? -filteredItems.length + 1 : 1
					scrollItemSelectIntoView()
				}
				if (kEnter) {
					e.preventDefault()
					e.stopPropagation()
					const selected = filteredItems[cursor]
					if (selected) {
						selectItem(selected)()
					}
				}
			}
		}
	}

	function scrollItemSelectIntoView() {
		const element = dialog.querySelector('.list-item.selected')
		if (!element) return
		if ('scrollIntoViewIfNeeded' in element) {
			//@ts-ignore
			element.scrollIntoViewIfNeeded({ block: 'end' })
		}
	}

	$: displayText = (itemText ? value[itemText] : value) || ''
</script>

<slot {open} {displayText}>
	<CLabel {label} {loading} let:rules={inputRules}>
		<input
			readonly
			{disabled}
			on:click={open}
			value={displayText}
			on:keydown={handleKeyDown('select')}
		/>
		<input hidden use:inputRules={rules} {value} />
		<svelte:fragment slot="append">
			<CIcon icon={mdiChevronDown} />
		</svelte:fragment>
	</CLabel>
</slot>

<dialog bind:this={dialog}>
	{#if filter}
		<div class="filter-input mb-4">
			<CLabel>
				<input
					placeholder="Filtrar Lista"
					type="search"
					bind:value={fitlerValue}
					on:input={onFilter}
					on:keydown={handleKeyDown('filter')}
				/>
			</CLabel>
		</div>
	{/if}
	<div class="options">
		{#if !filteredItems.length}
			<div class="px-4">
				{noDataText}
			</div>
		{:else}
			{#each filteredItems as item, i}
				<button class="list-item" class:selected={cursor === i} on:click={selectItem(item)}>
					<slot name="item" {item} index={i}>
						{itemText ? item[itemText] : item}
					</slot>
				</button>
			{/each}
		{/if}
	</div>
</dialog>

<style lang="scss">
	input[readonly] {
		cursor: initial;
		user-select: none;
	}
	.options {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--size-1);
	}
	.filter-input {
		position: sticky;
		top: 0;
		z-index: 1;
	}
	dialog {
		max-width: min(350px, 100vw);
		height: 95dvh;
		width: auto;
		margin: auto;
		animation: scale 0.1s ease;
		box-shadow: var(--shadow-3);
		background-color: var(--s-4);
		border: 1px solid var(--s-3);
		border-radius: var(--size-1);
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
		}
	}
</style>
