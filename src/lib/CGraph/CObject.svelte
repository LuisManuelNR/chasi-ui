<script lang="ts">
	import type { Base, Domain } from './CGraph.svelte'
	import { getContext } from 'svelte'
	import { linearScale } from './utils'

	export let x: number | string = 15
	export let y: number | string = 15
	export let width: number | string = '100'
	export let height: number | string = '100'

	const baseX = getContext<Base>('baseX')
	const baseY = getContext<Base>('baseY')

	export let domainX: Domain = $baseX
	export let domainY: Domain = $baseY

	$: xPos = linearScale(+x, domainX[0], domainX[1], $baseX[0], $baseX[1])
	$: yPos = linearScale(+y, domainY[0], domainY[1], $baseY[0], $baseY[1])
</script>

<foreignObject x={xPos} y={yPos} {width} {height}>
	<slot />
</foreignObject>
