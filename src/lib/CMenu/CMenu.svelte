<script lang="ts">
	import { randomString } from '$lib/utils.js'
	import { type Snippet } from 'svelte'

	type Props = {
		content?: Snippet
		children?: Snippet
		direction?: 'left' | 'right'
		closeonclick?: boolean
	}

	let { direction = 'right', children, content, closeonclick = true }: Props = $props()

	const id = randomString()

	function setup(node: HTMLDivElement) {
		const btn = node.firstChild as HTMLButtonElement
		if (!btn) {
			console.warn(
				'Missing trigger element on menu, should be the first element inside menu component'
			)
			return
		}
		btn.setAttribute('popovertarget', id)
	}

	function onclick(e: Event) {
		if (!closeonclick) return
		const t = e.currentTarget as HTMLDialogElement
		t.hidePopover()
	}
</script>

<div class="menu {direction}" use:setup style="anchor-name: --{id};">
	{@render children?.()}

	<dialog
		{id}
		popover
		class="popover border-r1 shadow-4 {direction}"
		{onclick}
		style="anchor-name: --{id};"
	>
		{@render content?.()}
	</dialog>
</div>

<style>
	.menu {
		width: fit-content;
		position: relative;
	}
	.popover {
		display: none;
		position: absolute;
		inset: auto;
		margin: 0;
		inset: auto;
		transition-behavior: allow-discrete;
		border: none;
		top: anchor(bottom);
		transition:
			display 150ms,
			scale 150ms;
		&:popover-open {
			display: block;
			scale: 1;

			@starting-style {
				display: block;
				scale: 0.7;
			}
		}
		&.left {
			right: anchor(right);
			transform-origin: right top;
		}
		&.right {
			left: anchor(left);
			transform-origin: left top;
		}
	}
</style>
