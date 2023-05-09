<script lang="ts">
	import { draggable } from '$lib/Actions'

	type NestedList = {
		name: string
		childs?: NestedList[]
	}
	export let list: NestedList[] = []

	function patata() {}
</script>

<div class="tree-drop-zone">
	{#each list as item}
		<div
			class="tree-item"
			use:draggable={{ dropZone: '.tree-drop-zone', handler: '.tree-handler', onChange: patata }}
		>
			<p class="n-200 pa-3 mb-2 tree-handler">
				{item.name}
			</p>
			{#if item.childs}
				<div class="childs ml-4">
					<svelte:self list={item.childs} />
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.tree-drop-zone {
		overflow: hidden;
	}
	.childs {
		border-left: 1px solid var(--n-100);
	}
	.tree-item {
		transition: transform 150ms;
		user-select: none;
	}
</style>
