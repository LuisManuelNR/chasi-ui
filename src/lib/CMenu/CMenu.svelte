<script lang="ts">
	import { tick } from 'svelte'

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
		menuContent.style.top = `${top + height}px`
		menuContent.style.left = `${left}px`
		menuContent.style.width = `${width}px`
		const menuBound = menuContent.getBoundingClientRect()
		const flip = window.innerHeight - bottom < menuBound.height
		menuContent.style.top = flip ? `${top - menuBound.height}px` : `${top + height}px`
	}

	function openMenu() {
		visible = true
	}
	function closeMenu() {
		visible = false
	}
	function toggle(e: MouseEvent | KeyboardEvent) {
		e.stopPropagation()
		if (visible) closeMenu()
		else openMenu()
	}
	function onContentClick(e: MouseEvent) {
		if (!closeOnClick) e.stopPropagation()
	}
</script>

<svelte:window on:click={closeMenu} on:scroll={resolveOrientation} />

<div class="c-menu" bind:this={menuElement}>
	<slot name="action">
		<button class="btn" on:click={toggle}>open</button>
	</slot>
	{#if visible}
		<div
			bind:this={menuContent}
			tabindex="-1"
			class="c-menu-content"
			on:click={onContentClick}
			on:keydown
		>
			<slot {toggle} {visible} />
		</div>
	{/if}
</div>

<style lang="scss">
	.c-menu-content {
		position: fixed;
		min-width: 20ch;
		z-index: 99999;
	}
</style>
