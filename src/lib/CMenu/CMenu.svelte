<script module>
	let menuInstances = 0
</script>

<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		action?: Snippet
		children?: Snippet
		class?: string
		text?: string
		'x-axis'?: 'left' | 'center' | 'right'
		'y-axis'?: 'top' | 'center' | 'bottom'
	}
	let p: Props = $props()
	const id = menuInstances++
</script>

<button popovertarget="menu-dialog-{id}" class={p.class}>
	{#if p.action}
		{@render p.action()}
	{:else}
		{p.text}
	{/if}
</button>

<dialog
	popover="auto"
	id="menu-dialog-{id}"
	class="shadow-4 bg border-r1"
	style:--x={p['x-axis']}
	style:--y={p['y-axis']}
>
	{@render p.children?.()}
</dialog>

<style>
	button {
		anchor-name: --activator;
	}
	dialog {
		border: none;
		position-anchor: --activator;
		left: anchor(var(--x, center));
		top: anchor(var(--y, center));
		position-try-fallbacks: --left;
	}

	@position-try --left {
		right: anchor(right);
	}
</style>
