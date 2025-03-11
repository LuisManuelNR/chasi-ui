<script lang="ts" generics="Item">
	import type { Snippet } from 'svelte'

	type Props = {
		selectValue?: Item
		value: Item
		children?: Snippet
		onselect?: (item: Item) => void
	}

	let { selectValue = $bindable(), value, children, onselect }: Props = $props()
	let selected = $derived(selectValue === value)

	function select() {
		selectValue = value
		if (onselect) onselect(value)
	}

	function handleKeyDown(e: KeyboardEvent) {
		const kUp = e.code === 'ArrowUp'
		const kDown = e.code === 'ArrowDown'
		const intro = e.code === 'Enter'
		if (!kUp && !kDown && !intro) {
			const filterInput = document.querySelector<HTMLInputElement>('dialog[open] [type="search"]')
			if (filterInput) filterInput.focus()
		}
		if (intro) {
			e.stopPropagation()
			e.preventDefault()
			select()
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<label class="list-item full-width" class:selected onmouseup={select}>
	<input type="radio" checked={selected} name="select-option" onkeydown={handleKeyDown} />
	{@render children?.()}
</label>

<style>
	input {
		opacity: 0;
		width: 0;
		height: 0;
	}
</style>
