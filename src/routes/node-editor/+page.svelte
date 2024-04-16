<script lang="ts">
	import CNodeEditor from '$lib/CNodeEditor/CNodeEditor.svelte'

	let nodes = {
		A: 'BOBO',
		B: 'PAPA',
		C: 'TOTO'
	}
</script>

<h1>Node editor</h1>
<CNodeEditor {nodes}>
	<!-- <N>Hello</N> -->
</CNodeEditor>
