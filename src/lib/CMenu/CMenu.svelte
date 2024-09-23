<script context="module" lang="ts">
	const menus = new Set<() => void>()
</script>

<script lang="ts">
	import { onMount } from 'svelte'

	let visible = false
	let anchorElement: HTMLElement | undefined
	let x = 0
	let y = 0

	function resolveOrientation(node: HTMLElement) {
		if (!visible || !anchorElement) return
		const { left, top, width, height, bottom } = anchorElement.getBoundingClientRect()
		const menuBound = node.getBoundingClientRect()
		const flipY = window.innerHeight - bottom < menuBound.height
		const flipX = window.innerWidth - left < menuBound.width
		x = flipX ? left - menuBound.width + width : left
		y = flipY ? top - menuBound.height : top + height
	}

	function openMenu() {
		menus.forEach((v) => v())
		window.addEventListener('scroll', closeMenu)
		visible = true
		setTimeout(() => {
			window.addEventListener('click', closeMenu)
		}, 0)
	}

	function closeMenu() {
		visible = false
		window.removeEventListener('scroll', closeMenu)
		window.removeEventListener('click', closeMenu)
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

<slot name="action" {toggle}>
	<button class="btn" on:click={toggle}>open</button>
</slot>

{#if visible}
	<div
		tabindex="-1"
		class="c-menu-content"
		role="menu"
		style:translate="{x}px {y}px"
		use:resolveOrientation
	>
		<slot />
	</div>
{/if}

<style lang="scss">
	@layer ChasiMenu {
		.c-menu-content {
			box-shadow: var(--shadow-3);
			border-radius: var(--size-1);
			border: none;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2;
		}
	}
</style>
