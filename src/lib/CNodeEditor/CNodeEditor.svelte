<script lang="ts">
	import { randomString } from '../utils.js'
	import ContextMenu from './ContextMenu.svelte'
	import Control from './Control.svelte'
	import Edges from './Edges.svelte'
	import GraphCanvas from './GraphCanvas.svelte'
	import Node from './Node.svelte'
	import type { Connections, NodesMap, Nodes } from './index.js'

	export let height = '600px'
	export let connections: Connections = {}
	export let nodes: Nodes = {}
	export let nodesMap: NodesMap = {}

	let canvasElement: HTMLElement
	let canvasScale = 1
	let canvasPosition = [0, 0]

	function addNode(name: string, position: number[]) {
		return () => {
			if (!nodesMap[name]) return
			const canvas = canvasElement.querySelector('.canvas')!
			const { left, top } = canvas.getBoundingClientRect()
			const nodeposition = [(position[0] - left) / canvasScale, (position[1] - top) / canvasScale]
			const id = `${name}-${randomString()}`
			nodes[id] = {
				id,
				name,
				position: nodeposition,
				...nodesMap[name]
			}
		}
	}
</script>

<div bind:this={canvasElement}>
	<GraphCanvas {height} bind:scale={canvasScale} bind:position={canvasPosition}>
		{#each Object.entries(nodes) as [name, value]}
			<Node scale={canvasScale} position={value.position}>
				{value.name}
				<Control id={value.id} bind:controls={nodes[name].inputs}></Control>
				<Control id={value.id} bind:controls={nodes[name].outputs} outputs></Control>
			</Node>
		{/each}
		<Edges {connections} scale={canvasScale}></Edges>
	</GraphCanvas>
	<ContextMenu let:position>
		{#each Object.entries(nodesMap) as [name, value]}
			<button class="list-item s-4 full-width" on:click={addNode(name, position)}>
				{name}
			</button>
		{/each}
	</ContextMenu>
</div>
