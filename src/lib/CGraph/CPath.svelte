<script lang="ts">
	import type { Base, Domain } from './CGraph.svelte'
	import { getContext } from 'svelte'
	import { min, max, linearScale } from './utils'
	export let color = 'steelblue'
	export let width: number | string = 3
	export let dasharray = ''

	export let y: number[] = []
	export let x: number[] = []
	export let domainX: Domain = x.length ? [min(x), max(x)] : [0, y.length - 1]
	export let domainY: Domain = [min(y), max(y)]

	const baseX = getContext<Base>('baseX')
	const baseY = getContext<Base>('baseY')

	let d = ''
	$: {
		if (y.length) {
			const points: Array<number | string> = ['M']
			for (let i = 0; i < y.length; i++) {
				const px = x[i] || i
				const py = y[i]
				if (isFinite(px) && isFinite(py)) {
					points.push(
						linearScale(px, domainX[0], domainX[1], $baseX[0], $baseX[1]),
						linearScale(py, domainY[0], domainY[1], $baseY[0], $baseY[1])
					)
				} else {
					points.push('M')
				}
			}
			d = points.join(' ')
		}
	}
</script>

<path
	fill="none"
	stroke={color}
	stroke-linejoin="round"
	stroke-linecap="round"
	stroke-width={width}
	stroke-dasharray={dasharray}
	vector-effect="non-scaling-stroke"
	{d}
/>
