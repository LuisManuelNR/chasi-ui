<script lang="ts">
	import CNodeEditor from '$lib/CNodeEditor/CNodeEditor.svelte'

	let nodes = {}
	const nodesMap = {
		fruta: {
			inputs: {
				banana: '',
				platano: '',
				mango: ''
			},
			outputs: {
				batido: '',
				durofrio: ''
			}
		},
		carne: {
			inputs: {
				pescado: '',
				vaca: '',
				cerdo: ''
			},
			outputs: {
				filete: ''
			}
		}
	}
</script>

<h1>Node editor</h1>

<CNodeEditor bind:nodes {nodesMap}></CNodeEditor>
<pre>{JSON.stringify(nodes, null, 2)}</pre>
