<script context="module" lang="ts">
	const menus = new Set<() => void>()
</script>

<script lang="ts">
	import { onMount, tick } from 'svelte'

	let visible = false
	let anchorElement: HTMLElement
	let popoverElement: HTMLElement
	let x = 0
	let y = 0

	$: visible && resolveOrientation()

	async function resolveOrientation() {
		if (!visible) return
		await tick()
		const { left, top, width, height, bottom } = anchorElement.getBoundingClientRect()
		const menuBound = popoverElement.getBoundingClientRect()
		const flipY = window.innerHeight - bottom < menuBound.height
		const flipX = window.innerWidth - left < menuBound.width
		x = flipX ? left - menuBound.width + width : left
		y = flipY ? top - menuBound.height : top + height
	}

	function openMenu() {
		menus.forEach((v) => v())
		popoverElement.showPopover()
		visible = true
	}

	function closeMenu() {
		popoverElement.hidePopover()
		visible = false
	}

	function toggle(e: MouseEvent | KeyboardEvent) {
		anchorElement = e.target as HTMLElement
		if (visible) closeMenu()
		else openMenu()
	}

	onMount(() => {
		menus.add(closeMenu)
		return () => {
			menus.delete(closeMenu)
		}
	})
</script>

<svelte:window on:scroll={closeMenu} />

<slot name="action" {toggle}>
	<button class="btn" on:click={toggle}>open</button>
</slot>

<div
	bind:this={popoverElement}
	on:click={closeMenu}
	on:keypress
	popover="manual"
	tabindex="-1"
	class="c-menu-content"
	role="menu"
	style:translate="{x}px {y}px"
>
	<slot />
</div>

<style lang="scss">
	@layer ChasiMenu {
		.c-menu-content {
			box-shadow: var(--shadow-3);
			border-radius: var(--size-1);
			border: none;
		}
	}
</style>
