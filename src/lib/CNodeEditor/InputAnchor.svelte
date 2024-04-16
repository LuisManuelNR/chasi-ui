<script lang="ts">
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiRecordCircle } from '@mdi/js'
	import { createEventDispatcher, getContext } from 'svelte'

	export let id = ''
	export let type: string

	const dispatch = createEventDispatcher<{ update: null }>()
	const connectionManager = getContext<ConnectionManager>('connectionsManager')

	function disconnect() {
		connectionManager.disconnect(id)
		dispatch('update')
	}

	function handleConnection(e: CustomEvent<{ type: string; id: string }>) {
		if (e.detail.type !== type) return
		if (id === e.detail.id) return
		connectionManager.connect(e.detail.id, id)
		dispatch('update')
	}
</script>

<button
	data-anchor-id={id}
	class="btn icon ghost data-type {type}"
	on:click={disconnect}
	on:connect={handleConnection}
>
	<CIcon icon={mdiRecordCircle} />
</button>

<style>
	button {
		color: var(--color);
	}
</style>
