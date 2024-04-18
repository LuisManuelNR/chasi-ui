<script lang="ts">
	import CLabel from '$lib/CForms/CLabel.svelte'
	import InputAnchor from './InputAnchor.svelte'
	import OutputAnchor from './OutputAnchor.svelte'
	import type { NodeSocket } from './index.js'

	export let id: string
	export let controls: NodeSocket | undefined = undefined
	export let outputs = false
</script>

{#if controls}
	<div class="d-grid gap-3" class:outputs>
		{#each Object.entries(controls) as [name, value]}
			{@const type = typeof value}
			{@const ctrlID = `${id}.${outputs ? 'outputs' : 'inputs'}.${name}`}
			{#if !outputs}
				<InputAnchor id={ctrlID} {type}></InputAnchor>
				<span>{name}</span>
				{#if type === 'string'}
					<input class="ml-auto" type="text" bind:value={controls[name]} />
				{/if}
			{:else}
				<span>{name}</span>
				<OutputAnchor id={ctrlID} {type}></OutputAnchor>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.d-grid {
		--xs-columns: auto auto 1fr;
	}
	.outputs {
		--xs-columns: 1fr auto;
	}
	input {
		background-color: var(--s-5);
	}
</style>
