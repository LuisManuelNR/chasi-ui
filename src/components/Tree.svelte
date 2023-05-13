<script lang="ts">
	import { CDraggableList, CExpand, CIcon } from '$lib'
	import { mdiPlus } from '@mdi/js'
	type NestedList = {
		name: string
		childs?: NestedList[]
	}
	export let list: NestedList[] = []
</script>

<CDraggableList bind:list let:item let:index group="draggable-tree" class="childs pa-2 ml-4">
	<div class="tree-item draggable mb-2">
		{#if item.childs}
			<CExpand active let:toggle>
				<div slot="action" class="n-200 d-flex align-center gap-2 handler">
					<button class="btn icon ignore-handler" on:click={toggle}>
						<CIcon icon={mdiPlus} />
					</button>
					{item.name}
				</div>
				<svelte:self bind:list={list[index].childs} />
			</CExpand>
		{:else}
			<div class="n-200 pa-2 d-flex handler">
				{item.name}
			</div>
		{/if}
	</div>
</CDraggableList>

<style>
	:global(.childs) {
		border-left: 1px solid var(--n-100);
	}
	:global(.tree-item) {
		user-select: none;
	}
</style>
