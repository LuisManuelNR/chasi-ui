<script lang="ts">
	import CNodeEditor from '$lib/CNodeEditor/CNodeEditor.svelte'
	import type { NodesMap } from '$lib/CNodeEditor/index.js'
	import Carne from './Carne.svelte'
	import Fruta from './Fruta.svelte'

	let nodes = {}
	const nodesMap: NodesMap = {
		fruta: {
			component: Fruta
		},
		carne: {
			component: Carne
		}
	}
</script>

<h1>Node editor</h1>

<CNodeEditor bind:nodes {nodesMap}></CNodeEditor>
<pre>{JSON.stringify(nodes, null, 2)}</pre>
