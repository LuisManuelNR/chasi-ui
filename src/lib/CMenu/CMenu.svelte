<script context="module" lang="ts">
	const menus = new Set<() => void>()
</script>

<script lang="ts">
	import { onMount, tick } from 'svelte'

	export let closeOnClick = false
	export let visible = false

	let menuElement: HTMLDivElement
	let menuContent: HTMLElement

	$: if (visible) {
		resolveOrientation()
	}

	async function resolveOrientation() {
		if (!visible) return
		await tick()
		const { left, top, width, height, bottom } = menuElement.getBoundingClientRect()
		menuContent.style.minWidth = `${width}px`
		const menuBound = menuContent.getBoundingClientRect()
		const flipY = window.innerHeight - bottom < menuBound.height
		const flipX = window.innerWidth - left < menuBound.width
		menuContent.style.left = flipX ? `${left - menuBound.width + width}px` : `${left}px`
		menuContent.style.top = flipY ? `${top - menuBound.height}px` : `${top + height}px`
	}

	function openMenu() {
		menus.forEach((v) => v())
		visible = true
	}
	function closeMenu() {
		if (visible) {
			visible = false
		}
	}
	function toggle(e: MouseEvent | KeyboardEvent) {
		e.stopPropagation()
		if (visible) closeMenu()
		else openMenu()
	}
	function onContentClick(e: MouseEvent) {
		if (!closeOnClick) e.stopPropagation()
	}
	onMount(() => {
		menus.add(closeMenu)
		return () => {
			menus.delete(closeMenu)
		}
	})
</script>

<svelte:window on:click={closeMenu} on:scroll={resolveOrientation} />

<div class="c-menu" bind:this={menuElement}>
	<slot name="action" {toggle}>
		<button class="btn" on:click={toggle}>open</button>
	</slot>
	{#if visible}
		<div
			bind:this={menuContent}
			tabindex="-1"
			class="c-menu-content"
			on:click={onContentClick}
			on:keydown
			role="menu"
		>
			<slot {visible} />
		</div>
	{/if}
</div>

<style lang="scss">
	@layer ChasiMenu {
		.c-menu-content {
			position: fixed;
			z-index: 99999;
			box-shadow: var(--shadow-3);
			border-bottom-left-radius: var(--size-1);
			border-bottom-right-radius: var(--size-1);
		}
	}
</style>
