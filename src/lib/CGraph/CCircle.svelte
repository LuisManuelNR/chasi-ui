<script lang="ts">
  import type { Base, Domain } from './CGraph.svelte'
  import { getContext } from 'svelte'
  import { linearScale } from './utils'

  export let x: number | string = 15
  export let y: number | string = 15
  export let r: number | string = 10
  export let strokeColor = 'black'
  export let strokeWidth: number | string = 3
  export let color = 'red'
  
  const baseX = getContext<Base>('baseX')
  const baseY = getContext<Base>('baseY')

  export let domainX: Domain = $baseX
  export let domainY: Domain = $baseY
      
  $: xPos = linearScale(+x, domainX[0], domainX[1], $baseX[0], $baseX[1])
  $: yPos = linearScale(+y, domainY[0], domainY[1], $baseY[0], $baseY[1])
</script>

<circle
  cx={xPos}
  cy={yPos}
  r={r}
  stroke={strokeColor}
  stroke-width={strokeWidth}
  fill={color}
/>