<script lang="ts">
	import type { Writable } from 'svelte/store'
	import type { Base, Domain } from './CGraph.svelte'
	import { getContext } from 'svelte'
	import { linearScale, ticks } from './utils.js'
	export let domain: Domain = [0, 1]
	export let ticksNumber: number | string = 10
	export let label = ''
	export let color = 'white'
	export let formatValue = (v: number) => v

	const baseY = getContext<Base>('baseY')
	const rootHeight = getContext<Writable<number>>('rootHeight')

	$: minDomain = linearScale(0, $baseY[0], $baseY[1], domain[0], domain[1])
	$: maxDomain = linearScale($rootHeight, $baseY[0], $baseY[1], domain[0], domain[1])
	$: tickList = ticks(minDomain, maxDomain, +ticksNumber).map((v) => ({
		val: formatValue(v),
		pos: linearScale(v, domain[0], domain[1], $baseY[0], $baseY[1])
	}))
</script>

<g text-anchor="end" fill={color} stroke={color} stroke-width="1">
	<line y1={$rootHeight}></line>
	{#each tickList as t}
		<g transform="translate(0, {t.pos})">
			<line x2="-6"></line>
			<text stroke-width="0.1" x="-8" dy="0.32em">{t.val}</text>
		</g>
	{/each}
	<text transform="rotate(-90)" y="6" dy="0.71em" stroke-width="0.1">{label}</text>
</g>
