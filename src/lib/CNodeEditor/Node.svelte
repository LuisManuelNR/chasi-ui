<script lang="ts">
	import { pannable } from '../Actions/index.js'
	import { createEventDispatcher } from 'svelte'

	export let position: number[] = [0, 0]
	export let scale = 1

	const dispatch = createEventDispatcher<{ update: null; remove: null }>()

	function setup(node: HTMLElement) {
		let startPos = position
		return pannable(node, {
			onStart(e, coords) {
				if (e.ctrlKey) return false
				startPos = [...position]
			},
			onMove(e, coords) {
				position[0] += coords.dx / scale
				position[1] += coords.dy / scale
				window.dispatchEvent(new CustomEvent('update-edges'))
			},
			onEnd() {
				if (startPos[0] === position[0] && startPos[1] === position[1]) return
				dispatch('update')
			}
		})
	}

	let nodeH: number
	let nodeW: number
	$: nodeH && window.dispatchEvent(new CustomEvent('update-edges'))
	$: nodeW && window.dispatchEvent(new CustomEvent('update-edges'))
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="graph-node s-4"
	style="transform: translate({position[0]}px, {position[1]}px);"
	use:setup
	tabindex="0"
	role="presentation"
	bind:clientHeight={nodeH}
	bind:clientWidth={nodeW}
>
	<slot />
</div>

<style lang="scss">
	.graph-node {
		position: absolute;
		min-width: 300px;
		outline: 1px solid var(--s-3);
		border-radius: var(--size-1);
		box-shadow: var(--shadow-2);
		z-index: 0;
		cursor: grab;
		&:focus-within {
			z-index: 1;
			outline-color: var(--accent);
		}
	}
</style>
