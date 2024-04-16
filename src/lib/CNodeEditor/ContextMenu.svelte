<script lang="ts">
	let position = [0, 0]
	let active = false

	function handleContextMenu(e: Event) {
		if (e.type !== 'contextmenu') return
		const event = e as PointerEvent
		event.preventDefault()
		position[0] = event.pageX
		position[1] = event.pageY
		if (active) return
		active = true
		window.addEventListener('click', () => (active = false), { once: true })
	}

	function setup(node: HTMLElement) {
		const parent = node.parentElement!
		parent.addEventListener('contextmenu', handleContextMenu)
		return {
			destroy() {
				parent.removeEventListener('contextmenu', handleContextMenu)
			}
		}
	}
</script>

<div role="presentation" use:setup>
	{#if active}
		<div class="contextmenu card" style="transform: translate({position[0]}px, {position[1]}px);">
			<slot>context menu!</slot>
		</div>
	{/if}
</div>

<style>
	.contextmenu {
		position: fixed;
		top: 0;
		left: 0;
		width: 250px;
		max-height: 400px;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>
