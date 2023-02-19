<script context="module" lang="ts">
	export type Base = Writable<Domain>
	export type Domain = [number, number]
	import type { Writable } from 'svelte/store'
</script>

<script lang="ts">
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'
	import { pannable, zoomable } from '../Actions'
	import { zoom } from './utils'

	export let height = 500

	export let allowPan = false
	export let allowPanX = false
	export let allowPanY = false

	export let allowZoom = false
	export let allowZoomY = false
	export let allowZoomX = false

	export let marginTop: number | string = 40
	export let marginRight: number | string = 40
	export let marginBottom: number | string = 30
	export let marginLeft: number | string = 40

	const baseX = writable([1, 99])
	const baseY = writable([99, 1])
	const rootWidth = writable(99)
	const rootHeight = writable(80)

	setContext('baseX', baseX)
	setContext('baseY', baseY)
	setContext('rootWidth', rootWidth)
	setContext('rootHeight', rootHeight)

	function panGraph(node: Element) {
		if (!allowPan && !allowPanX && !allowPanY) return
		const el = node as HTMLElement
		return pannable(el, {
			onMove(e, coords) {
				if (allowPanX || allowPan) {
					baseX.update((base) => base.map((v) => (v += coords.dx)))
				}
				if (allowPanY || allowPan) {
					baseY.update((base) => base.map((v) => (v += coords.dy)))
				}
			}
		})
	}

	function zoomGraph(node: Element) {
		if (!allowZoom && !allowZoomX && !allowZoomY) return
		const el = node as HTMLElement
		return zoomable(el, {
			onZoom(delta, center) {
				const { left, top } = el.getBoundingClientRect()
				if (allowZoomX || allowZoom) {
					const zx = center.x - left - +marginLeft
					baseX.update((base) => base.map((v) => zoom(v, -delta, zx)))
				}
				if (allowZoomY || allowZoom) {
					const zy = center.y - top - +marginTop
					baseY.update((base) => base.map((v) => zoom(v, -delta, zy)))
				}
			}
		})
	}

	function setBases(node: Element) {
		const { width, height } = node.getBoundingClientRect()
		const containerW = width - +marginLeft - +marginRight
		const containerH = height - +marginTop - +marginBottom
		baseX.set([0, containerW])
		baseY.set([containerH, 0])
		rootWidth.set(containerW)
		rootHeight.set(height - +marginTop - +marginBottom)
	}
</script>

<svg class="c-graph" width="100%" {height} use:panGraph use:zoomGraph use:setBases>
	<g transform="translate({marginLeft}, {marginTop})">
		<slot />
	</g>
</svg>

<style lang="scss" global>
	.c-graph {
		user-select: none;
		display: flex;
	}
</style>
