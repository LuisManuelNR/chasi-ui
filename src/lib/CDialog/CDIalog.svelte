<script lang="ts">
	import { onMount, type Snippet } from 'svelte'
	import { on } from 'svelte/events'

	type Props = {
		children?: Snippet<[typeof close]>
		action?: Snippet<[typeof open]>
		class?: string
		active?: boolean
		persistent?: boolean
	}

	let { active = $bindable(false), action, children, class: klass, persistent }: Props = $props()

	let dialogElement: HTMLDialogElement

	function open() {
		active = true
	}
	function close() {
		active = false
	}

	onMount(() => {
		const onclose = on(dialogElement, 'close', close)
		const onclickoutside = on(window, 'click', (e) => {
			if (persistent) return
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

{@render action?.(open)}

<dialog class="c-dialog shadow-3 {klass}" bind:this={dialogElement}>
	{@render children?.(close)}
</dialog>

<style>
	.c-dialog {
		max-width: var(--dialog-max-width, 75ch);
		width: 100%;
		border: none;
		margin: auto;
		animation: scale 0.1s ease;
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
		}
	}
</style>
