<script lang="ts">
	type NestedList = {
		name: string
		childs?: NestedList[]
	}
	export let list: NestedList[] = []
</script>

{#each list as item}
	<div class="tree-item">
		<p class="n-200 pa-3 mb-2 tree-handler">
			{item.name}
		</p>
		{#if item.childs}
			<div class="childs pa-2 ml-4 tree-drop-zone">
				<svelte:self list={item.childs} />
			</div>
		{/if}
	</div>
{/each}

<style>
	.childs {
		border-left: 1px solid var(--n-100);
	}
	.tree-item {
		transition: transform 150ms;
		user-select: none;
	}
</style>
