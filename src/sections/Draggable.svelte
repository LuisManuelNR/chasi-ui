<script lang="ts">
	import Section from './Section.svelte'
	import { CDraggableList } from '$lib'
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
		const url = 'https://jsonplaceholder.typicode.com/photos?_limit=12'
		const response = await fetch(url)
		photos = await response.json()
	}

	onMount(() => {
		loadData()
	})
</script>

<Section title="Draggable">
	<div class="scrollable">
		<CDraggableList bind:list={photos}>
			{#each photos as photo (photo.id)}
				<div class="d-flex gap-2 draggable handler n-200">
					<!-- <button class="c-btn icon handler">
            <CIcon icon={mdiDrag} />
          </button> -->
					<img src={photo.thumbnailUrl} alt="ssss" width="150" height="150" />
					<p class="title">{photo.title}</p>
				</div>
			{/each}
		</CDraggableList>
	</div>
</Section>

<style>
	.scrollable {
		max-height: 700px;
		overflow: auto;
	}
	.draggable {
		border-radius: var(--size-1);
		margin-bottom: var(--size-4);
	}
</style>
