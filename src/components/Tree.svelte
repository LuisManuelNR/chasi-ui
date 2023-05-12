<script lang="ts">
	import { CDraggableList } from '$lib'
	type NestedList = {
		name: string
		childs?: NestedList[]
	}
	export let list: NestedList[] = []
</script>

<CDraggableList bind:list let:item let:index group="draggable-tree" class="childs pa-2 ml-4">
	<div class="tree-item draggable">
		<div class="n-200 pa-3 mb-2 handler d-flex">
			{item.name}
		</div>
		{#if item.childs}
			<svelte:self bind:list={list[index].childs} />
		{/if}
	</div>
</CDraggableList>

<style>
	:global(.childs) {
		border-left: 1px solid var(--n-100);
	}
	.tree-item {
		user-select: none;
	}
</style>
