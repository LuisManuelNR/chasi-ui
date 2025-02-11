<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	type Props = {
		head?: Snippet
		children?: Snippet
		footer?: Snippet
		class?: ClassValue
	}
	const p: Props = $props()
</script>

<dialog class="c-sidebar d-grid full-height {p.class}">
	{@render p.head?.()}
	<div class="c-sidebar-body">
		{@render p.children?.()}
	</div>
	{@render p.footer?.()}
</dialog>

<style>
	.c-nav {
		grid-template-rows: auto 1fr auto;
	}
	.c-nav-body {
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
