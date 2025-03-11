<script lang="ts" generics="Item">
	import type { Snippet } from 'svelte'
	import type { InputRule } from './index.js'
	import CLabel from './CLabel.svelte'
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import CDialog from '$lib/CDialog/CDIalog.svelte'
	import { mdiChevronDown, mdiMagnify } from '@mdi/js'
	import CSelectOption from './CSelectOption.svelte'
	import { normalizeText } from '$lib/utils.js'
	import CText from './CText.svelte'

	type ItemProp = Item extends Record<string, any> ? keyof Item : undefined
	type Props = {
		label?: string
		rules?: InputRule[]
		loading?: boolean
		children?: Snippet
		options?: Snippet<[Item]>
		items?: Item[]
		value?: Item
		disabled?: boolean
		noItemsText?: string
		filterBy?: ItemProp
	}

	let {
		label,
		rules,
		loading,
		value = $bindable(),
		items = [],
		options,
		children,
		disabled,
		noItemsText = 'No hay datos disponibles',
		filterBy
	}: Props = $props()

	let active = $state(false)
	let filterValue = $state('')
	let filteredList = $derived(filterList(filterValue, items))

	function filterList(query: string, items: Item[]) {
		// cursor = -1
		if (!filterBy) return items
		return items.filter((v) => {
			//@ts-ignore
			const value = `${v[filterBy] || v}`
			const a = normalizeText(value)
			const b = normalizeText(query)
			return a.includes(b)
		})
	}
	function handleKeyDown(e: KeyboardEvent) {
		const kDown = e.code === 'ArrowDown'
		if (kDown) {
			const t = e.target as HTMLInputElement
			const parent = t.closest('dialog')!
			e.stopPropagation()
			e.preventDefault()
			const candidate = parent.querySelector<HTMLInputElement>('[type="radio"]')!
			candidate.focus()
		}
	}
</script>

<div class="c-select">
	<CLabel text={label} {rules} {loading}>
		<button class="content" type="button" {disabled} onclick={() => (active = true)}>
			{#if children}
				{@render children()}
			{:else}
				{value}
			{/if}
		</button>
		<input hidden type="text" bind:value />
		<CIcon class="append" icon={mdiChevronDown} />
	</CLabel>

	<CDialog bind:active>
		{#if filterBy}
			<div class="sticky bg pa-4 d-grid">
				<CText bind:value={filterValue} onkeydown={handleKeyDown}>
					<CIcon icon={mdiMagnify} class="preppend"></CIcon>
				</CText>
			</div>
		{/if}
		<div class="bg">
			{#each filteredList as item}
				<CSelectOption bind:selectValue={value} value={item} onselect={() => (active = false)}>
					{#if options}
						{@render options(item)}
					{:else}
						{item}
					{/if}
				</CSelectOption>
			{:else}
				<p class="pa-4">{noItemsText}</p>
			{/each}
		</div>
	</CDialog>
</div>

<style>
	.c-select {
		display: inline-grid;
		--dialog-max-width: 40ch;
	}
	button {
		text-align: start;
	}
	.sticky {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
