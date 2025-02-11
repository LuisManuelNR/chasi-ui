<script lang="ts">
	import { onMount, type Snippet } from 'svelte'
	import { on } from 'svelte/events'

	type Props = {
		head?: Snippet
		children?: Snippet
		footer?: Snippet
		class?: string
		width?: number
		active?: boolean
	}

	let { width = 250, active = $bindable(false), ...p }: Props = $props()

	let dialogElement: HTMLDialogElement

	onMount(() => {
		const onclose = on(dialogElement, 'close', () => {
			active = false
		})
		const onclickoutside = on(window, 'click', (e) => {
			if (e.target === dialogElement) {
				active = false
			}
		})
		return () => {
			onclose()
			onclickoutside()
		}
	})
	$effect(() => {
		if (active) dialogElement.showModal()
		else dialogElement.close()
	})
</script>

<dialog class="c-sidebar shadow-3 {p.class}" style:width="{width}px" bind:this={dialogElement}>
	<nav class="d-grid full-height">
		{@render p.head?.()}
		<div>
			{@render p.children?.()}
		</div>
		{@render p.footer?.()}
	</nav>
</dialog>

<style>
	.c-sidebar {
		border: none;
		min-height: 100dvh;
	}
	nav {
		grid-template-rows: auto 1fr auto;
		overflow-x: hidden;
		overflow-y: auto;
	}

	/* Open state of the dialog  */
	.c-sidebar:open {
		transform: translateX(0);
	}

	/* Closed state of the dialog   */
	.c-sidebar {
		transform: translateX(-100%);
		transition:
			transform 150ms ease-out,
			overlay 150ms ease-out allow-discrete,
			display 150ms ease-out allow-discrete;
	}

	/* Before open state  */
	/* Needs to be after the previous dialog:open rule to take effect,
    as the specificity is the same */
	@starting-style {
		.c-sidebar:open {
			transform: translateX(-100%);
		}
	}

	/* Transition the :backdrop when the dialog modal is promoted to the top layer */
	.c-sidebar::backdrop {
		background-color: rgb(0 0 0 / 0%);
		transition:
			display 300ms allow-discrete,
			overlay 300ms allow-discrete,
			background-color 300ms;
	}

	.c-sidebar:open::backdrop {
		background-color: rgb(0 0 0 / 25%);
	}

	/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

	@starting-style {
		.c-sidebar:open::backdrop {
			background-color: rgb(0 0 0 / 0%);
		}
	}
</style>
