<script lang="ts">
	import type { Rule } from './rules.js'
	import CLabel from './CLabel.svelte'
	import CIcon from '../CIcon/CIcon.svelte'
	import CDialog from '../CDialog/CDialog.svelte'
	import { createEventDispatcher } from 'svelte'
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

	let filteredItems: T[] = items
	let fitlerValue = ''
	let cursor = -1
	let dialog = false
	let listElement: HTMLDivElement
	const distpach = createEventDispatcher<{ change: T }>()

	function open() {
		filteredItems = items
		fitlerValue = ''
		cursor = -1
		dialog = true
	}

	function selectItem(item: T) {
		return () => {
			// @ts-ignore
			value = itemValue && item instanceof Object && item !== null ? item[itemValue] : item
			dialog = false
			filteredItems = items
			fitlerValue = ''
			distpach('change', item)
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
				if (kTab || kUp || kDown || kEnter) {
					e.stopPropagation()
					e.preventDefault()
				}
				if (kTab) {
					dialog = false
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
					const selected = filteredItems[cursor]
					if (selected) {
						selectItem(selected)()
					}
				}
			}
		}
	}

	function scrollItemSelectIntoView() {
		const element = listElement.querySelector('.list-item.selected')
		if (!element) return
		if ('scrollIntoViewIfNeeded' in element) {
			//@ts-ignore
			element.scrollIntoViewIfNeeded({ block: 'end' })
		}
	}

	$: displayText =
		(itemText && value instanceof Object && value !== null ? value[itemText] : value) || ''
</script>

<div class="c-select-ctrl">
	<slot {open} {displayText}>
		<CLabel {label} {loading} let:rules={inputRules}>
			<slot name="prepend" slot="prepend" />
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

	<div class="select-list" class:with-filter={filter}>
		<CDialog bind:active={dialog}>
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
			<div class="options" bind:this={listElement}>
				{#if !filteredItems.length}
					<div class="px-4">
						{noDataText}
					</div>
				{:else}
					{#each filteredItems as item, i}
						<button
							class="list-item"
							class:selected={cursor === i}
							on:click={selectItem(item)}
							on:keydown={handleKeyDown('filter')}
						>
							<slot name="item" {item} index={i}>
								{itemText ? item[itemText] : item}
							</slot>
						</button>
					{/each}
				{/if}
			</div>
		</CDialog>
	</div>
</div>

<style lang="scss">
	@layer ChasiSelect {
		input[readonly] {
			cursor: initial;
			user-select: none;
		}
		.select-list {
			--dialog-max-width: min(250px, 100vw);
			&.with-filter {
				:global(dialog) {
					height: 95dvh;
				}
			}
			:global(dialog) {
				padding: 0;
			}
		}
		.options {
			display: flex;
			flex-direction: column;
			gap: var(--size-1);
		}
		.filter-input {
			position: sticky;
			top: 0;
			z-index: 1;
		}
	}
</style>
