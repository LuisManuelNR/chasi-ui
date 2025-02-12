<script lang="ts">
	import { onMount, type Snippet } from 'svelte'
	import { on } from 'svelte/events'

	type Props = {
		head?: Snippet
		children?: Snippet
		footer?: Snippet
		class?: string
		active?: boolean
	}

	let { active = $bindable(false), ...p }: Props = $props()

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

<dialog class="c-dialog shadow-3 {p.class}" bind:this={dialogElement}>
	{@render p.children?.()}
</dialog>

<style>
	.c-dialog {
		max-width: 75ch;
		width: 100%;
		border: none;
		margin: auto;
	}

	/* Open state of the dialog  */
	.c-dialog:open {
		transform: scale(1);
	}

	/* Closed state of the dialog   */
	.c-dialog {
		transform: scale(0.9);
		transition:
			transform 150ms ease-out,
			overlay 150ms ease-out allow-discrete,
			display 150ms ease-out allow-discrete;
	}

	/* Before open state  */
	/* Needs to be after the previous dialog:open rule to take effect,
    as the specificity is the same */
	@starting-style {
		.c-dialog:open {
			transform: scale(0.9);
		}
	}

	/* Transition the :backdrop when the dialog modal is promoted to the top layer */
	.c-dialog::backdrop {
		background-color: rgb(0 0 0 / 0%);
		transition:
			display 500ms allow-discrete,
			overlay 500ms allow-discrete,
			background-color 500ms;
	}

	.c-dialog:open::backdrop {
		background-color: rgb(0 0 0 / 25%);
	}

	/* This starting-style rule cannot be nested inside the above selector
because the nesting selector cannot represent pseudo-elements. */

	@starting-style {
		.c-dialog:open::backdrop {
			background-color: rgb(0 0 0 / 0%);
		}
	}
</style>
