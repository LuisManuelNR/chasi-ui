<script lang="ts">
	import Section from './Section.svelte'
	import { CDraggableList, CIcon } from '$lib'
	import { draggable } from '$lib/Actions'
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
		const url = 'https://jsonplaceholder.typicode.com/photos?_limit=12'
		const response = await fetch(url)
		photos = await response.json()
	}

	let list1 = [
		'jh delhd aoiludh awleiudh awleiuch alwieujhc aliwuhc laiwuehc laiwue hc',
		2,
		'jf aopswij apowiedcj awpeoidj awefhawioufhjj asdkjfcn aoweijcn apwoeidfj apowiejdf awopseicj asl;dkfj askl;dfhj aloiuhjf alksdjhfc alskujhf alikwjuhf lkaszjhf e',
		4,
		5
	]
	let list2 = [6, 7, 8, 9]

	onMount(() => {
		loadData()
	})

	function updateList(from: HTMLElement, to: HTMLElement) {
		const fromListNumber = from.getAttribute('data-list')
		const fromList = fromListNumber === '1' ? list1 : list2
		const fromIndex = from.getAttribute('data-item')
		const toListNumber = to.getAttribute('data-list')
		const toList = toListNumber === '1' ? list1 : list2
		const toIndex = to.getAttribute('data-item')
		const item = fromList.splice(+fromIndex, 1)
		toList.splice(+toIndex, 0, item[0])
		list1 = list1
		list2 = list2
	}
</script>

<Section title="Draggable">
	<div class="scrollable">
		<!-- <CDraggableList bind:list={photos}>
			{#each photos as photo (photo.id)}
				<div class="d-flex gap-2 draggable handler n-200">
					<button class="btn icon handler">
            <CIcon icon={mdiDrag} />
          </button>
					<img src={photo.thumbnailUrl} alt="ssss" width="150" height="150" />
					<p class="title">{photo.title}</p>
				</div>
			{/each}
		</CDraggableList> -->
	</div>

	<div class="two-list d-grid gap-2">
		<div class="my-4 d-grid gap-4 droppable-zone">
			{#each list1 as item, i}
				<div
					use:draggable={updateList}
					data-list="1"
					data-item={i}
					class="d-flex align-center gap-2 n-200 pa-3"
				>
					<p class="title">{item}</p>
					<button class="btn icon tonal ml-auto handler">
						<CIcon icon={mdiDrag} />
					</button>
				</div>
			{/each}
		</div>
		<div class="my-4 d-grid gap-4 droppable-zone">
			{#each list2 as item, i}
				<div
					use:draggable={updateList}
					data-list="2"
					data-item={i}
					class="d-flex align-center gap-2 n-200 pa-3"
				>
					<p class="title">{item}</p>
					<button class="btn icon tonal ml-auto handler">
						<CIcon icon={mdiDrag} />
					</button>
				</div>
			{/each}
		</div>
	</div>
</Section>

<style>
	.two-list {
		--xs-columns: repeat(2, 1fr);
	}
	.scrollable {
		max-height: 700px;
		overflow: auto;
	}
	.draggable {
		border-radius: var(--size-1);
		margin-bottom: var(--size-4);
	}
</style>
