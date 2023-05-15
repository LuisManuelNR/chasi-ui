<script lang="ts">
	import { tick } from 'svelte'

	export let closeOnClick = false
	export let visible = false

	let menuElement: HTMLDivElement
	let menuContent: HTMLElement
	let orientation = 'to-bottom'

	$: {
		if (visible) {
			resolveOrientation()
		}
	}

	async function resolveOrientation() {
		await tick()
		const { bottom } = menuElement.getBoundingClientRect()
		const { height } = menuContent.getBoundingClientRect()
		orientation = window.innerHeight - bottom < height ? 'to-top' : 'to-bottom'
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

<svelte:window on:click={closeMenu} />

<div class="c-menu" bind:this={menuElement}>
	<slot name="action">
		<button class="btn" on:click={toggle}>open</button>
	</slot>
	{#if visible}
		<div
			bind:this={menuContent}
			tabindex="-1"
			class="c-menu-content {orientation}"
			on:click={onContentClick}
			on:keydown
		>
			<slot {toggle} {visible} />
		</div>
	{/if}
</div>

<style lang="scss">
	@layer Menu {
		.c-menu {
			position: relative;
			.c-menu-content {
				max-width: 98vw;
				position: absolute;
				left: 0;
				z-index: 999;
				&.to-bottom {
					top: 100%;
				}
				&.to-top {
					bottom: 100%;
				}
			}
		}
	}
</style>
