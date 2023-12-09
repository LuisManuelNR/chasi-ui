<script lang="ts">
	import { CDraggableList, CIcon } from '$lib'
	import { mdiDrag } from '@mdi/js'
	import { onMount } from 'svelte'
	import Tree from './Tree.svelte'

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
	let familyData = [
		{
			nombre: 'Raíz',
			hijos: [
				{
					nombre: 'Hijo1',
					hijos: [
						{
							nombre: 'Nieto1',
							hijos: []
						}
					]
				},
				{
					nombre: 'Hijo2',
					hijos: [
						{
							nombre: 'Nieto2',
							hijos: []
						},
						{
							nombre: 'Nieto3',
							hijos: []
						}
					]
				}
			]
		}
	]

	onMount(() => {
		loadData()
	})
</script>

<Tree bind:family={familyData}></Tree>

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
