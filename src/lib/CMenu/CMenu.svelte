<script context="module" lang="ts">
	const menus = new Set<() => void>()
</script>

<script lang="ts">
	import { onMount } from 'svelte'

	export let closeOnClick = false
	export let visible = false

	let x = 0
	let y = 0

	function openMenu() {
		menus.forEach((v) => v())
		visible = true
	}

	function closeMenu() {
		if (visible) visible = false
	}

	function toggle(e: MouseEvent) {
		e.stopPropagation()
		console.log(e)
		if (visible) closeMenu()
		else {
			x = e.x
			y = e.y
			openMenu()
		}
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

<svelte:window on:click={closeMenu} />

<slot name="action" {toggle}>
	<button class="btn" on:click={toggle}>open</button>
</slot>

{#if visible}
	<div
		tabindex="-1"
		class="c-menu-content"
		style:translate="{x}px {y}px"
		on:click={onContentClick}
		on:keydown
		role="menu"
	>
		<slot {visible} />
	</div>
{/if}

<style lang="scss">
	@layer ChasiMenu {
		.c-menu-content {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99999;
			box-shadow: var(--shadow-3);
			border-radius: var(--size-1);
		}
	}
</style>
