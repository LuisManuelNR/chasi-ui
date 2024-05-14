<script context="module" lang="ts">
	const menus = new Set<() => void>()
</script>

<script lang="ts">
	import { onMount } from 'svelte'

	export let closeOnClick = false

	let menuDialog: HTMLDialogElement
	let visible = false
	let x = 0
	let y = 0

	function openMenu() {
		menus.forEach((v) => v())
		menuDialog.showModal()
		visible = true
	}

	function closeMenu() {
		menuDialog.close()
		visible = false
	}

	function toggle(e: MouseEvent) {
		e.stopPropagation()
		if (visible) closeMenu()
		else {
			x = e.x
			y = e.y
			openMenu()
		}
	}

	onMount(() => {
		menus.add(closeMenu)
		return () => {
			menus.delete(closeMenu)
		}
	})
</script>

<svelte:window on:click={closeMenu} />

<slot name="action" {toggle}>
	<button class="btn" on:click={toggle}>open</button>
</slot>

<dialog bind:this={menuDialog} class="c-menu-content" style:translate="{x}px {y}px">
	<slot {visible} />
</dialog>

<style lang="scss">
	@layer ChasiMenu {
		.c-menu-content {
			box-shadow: var(--shadow-3);
			border-radius: var(--size-1);
			border: 0;
			&::backdrop {
				display: none;
			}
		}
	}
</style>
