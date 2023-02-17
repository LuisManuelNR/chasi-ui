<script lang="ts">
  import type { Writable } from 'svelte/store'
  import type { Base, Domain } from './CGraph.svelte'
  import { getContext } from 'svelte'
  import { linearScale, ticks } from './utils'
  export let domain: Domain = [0, 1]
  export let ticksNumber: number | string = 10
  export let label = ''
  export let color = 'white'
  export let formatValue = (v: number): string | number => v

  const baseX = getContext<Base>('baseX')
  const rootWidth = getContext<Writable<number>>('rootWidth')
  const rootHeight = getContext<Writable<number>>('rootHeight')

  $: minDomain = linearScale(0, $baseX[0], $baseX[1], domain[0], domain[1])
  $: maxDomain = linearScale($rootWidth, $baseX[0], $baseX[1], domain[0], domain[1])
  $: tickList = ticks(minDomain, maxDomain, +ticksNumber).map(v => ({
    val: formatValue(v),
    pos: linearScale(v, domain[0], domain[1], $baseX[0], $baseX[1])
  }))
</script>

<g
  fill={color}
  stroke={color}
  stroke-width="1"
  transform="translate(0, {$rootHeight})"
>
  <line x1="0" x2={$rootWidth}></line>
  {#each tickList as t}
    <g transform="translate({t.pos}, 0)">
      <line y2="6"></line>
      <text text-anchor="middle" stroke-width="0.1" y="9" dy="0.71em">{t.val}</text>
    </g>
  {/each}
  <text text-anchor="left" x="0" y="-25" dx="1em" dy="0.71em" stroke-width="0.1">{label}</text>
</g>