<script lang="ts">
	import { onMount } from 'svelte'

	export let scale = 1
	export let connections: Record<string, string> = {}

	let svgElement: SVGElement
	let links: number[][] = []
	let colors: string[] = []
	let isconnecting = false

	let root: number[] = [0, 0]
	let target: number[] = [0, 0]
	let rootColor: string = ''
	function onStart(e: CustomEvent<{ node: HTMLElement; x: number; y: number }>) {
		isconnecting = true
		rootColor = getColor(e.detail.node)
		root = resolveEdgePoint(getcenter(e.detail.node))
		target = resolveEdgePoint([e.detail.x, e.detail.y])
	}
	function onMove(e: CustomEvent<{ dx: number; dy: number }>) {
		target[0] += e.detail.dx / scale
		target[1] += e.detail.dy / scale
	}
	function onStop() {
		isconnecting = false
	}
	function updateLinks() {
		const newlinks = []
		const newColor = []
		for (const key in connections) {
			const anchorRoot = document.querySelector(`[data-anchor-output="${connections[key]}"]`)
			const anchorTarget = document.querySelector(`[data-anchor-id="${key}"]`)
			if (!anchorRoot || !anchorTarget) continue
			newColor.push(getColor(anchorRoot))
			const rootCenter = getcenter(anchorRoot)
			const targetCenter = getcenter(anchorTarget)
			newlinks.push([...resolveEdgePoint(rootCenter), ...resolveEdgePoint(targetCenter)])
		}
		links = newlinks
		colors = newColor
	}
	function getcenter(el: Element): number[] {
		const { x, width, y, height } = el.getBoundingClientRect()
		return [x + width / 2, y + height / 2]
	}
	function resolveEdgePoint(p: number[]): number[] {
		const parentCanvas = svgElement.closest('.canvas')!
		const { left, top } = parentCanvas.getBoundingClientRect()
		return [(p[0] - left) / scale, (p[1] - top) / scale]
	}
	function getColor(el: HTMLElement | Element) {
		return window.getComputedStyle(el).color
	}

	let isMounted = false
	$: isMounted && connections && updateLinks()
	onMount(() => {
		window.addEventListener('start-connect', onStart)
		window.addEventListener('move-connect', onMove)
		window.addEventListener('stop-connect', onStop)
		window.addEventListener('update-edges', updateLinks)
		isMounted = true
		return () => {
			window.removeEventListener('start-connect', onStart)
			window.removeEventListener('move-connect', onMove)
			window.removeEventListener('stop-connect', onStop)
			window.removeEventListener('update-edges', updateLinks)
		}
	})
</script>

<svg bind:this={svgElement}>
	{#if isconnecting}
		<path
			d="M{root[0]},{root[1]} {target[0]} {target[1]}"
			fill="none"
			stroke={rootColor}
			stroke-linejoin="round"
			stroke-linecap="round"
			stroke-width="3"
			stroke-dasharray=""
			vector-effect="non-scaling-stroke"
		/>
	{/if}
	{#each links as link, i}
		<path
			d="M{link[0]},{link[1]} {link[2]} {link[3]}"
			fill="none"
			stroke={colors[i]}
			stroke-linejoin="round"
			stroke-linecap="round"
			stroke-width="3"
			stroke-dasharray=""
			vector-effect="non-scaling-stroke"
		/>
	{/each}
</svg>

<style lang="scss">
	svg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 2;
		pointer-events: none;
		overflow: visible;
	}
</style>
