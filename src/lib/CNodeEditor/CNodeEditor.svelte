<script lang="ts">
	import ContextMenu from './ContextMenu.svelte'
	import Edges from './Edges.svelte'
	import GraphCanvas from './GraphCanvas.svelte'
	import Node from './Node.svelte'
	import type { Connections } from './index.js'

	export let height = '600px'
	export let connections: Connections = {}
	export let nodes = {}

	let canvasScale = 1
	let canvasPosition = [0, 0]
</script>

<div>
	<GraphCanvas {height} bind:scale={canvasScale} bind:position={canvasPosition}>
		{#each Object.keys(nodes) as [name, value]}
			<Node scale={canvasScale}>AAAA</Node>
		{/each}
		<Edges {connections} scale={canvasScale}></Edges>
	</GraphCanvas>
</div>
