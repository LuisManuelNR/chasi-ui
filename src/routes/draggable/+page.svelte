<script lang="ts">
	import { CDraggableList, CIcon } from '$lib'
	import { mdiDrag } from '@mdi/js'
	import { onMount } from 'svelte'

	type Photo = {
		albumId: number
		id: number
		title: string
		url: string
		thumbnailUrl: string
	}
	let photos: Photo[] = []

	async function loadData() {
		const url = 'https://jsonplaceholder.typicode.com/photos?_limit=7'
		const response = await fetch(url)
		photos = await response.json()
	}
	onMount(() => {
		loadData()
	})
</script>

<CDraggableList bind:list={photos}>
	{#each photos as photo (photo.id)}
		<div class="d-flex align-center gap-2 draggable s-2 pa-2 mb-2">
			<img src={photo.thumbnailUrl} alt="ssss" width="150" height="150" />
			<p class="title">{photo.title}</p>
			<button class="btn icon ml-auto handler">
				<CIcon icon={mdiDrag} />
			</button>
		</div>
	{/each}
</CDraggableList>
