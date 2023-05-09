<script lang="ts">
	import Section from './Section.svelte'
	import { CDraggableList, CIcon } from '$lib'
	import { draggable } from '$lib/Actions'
	import { mdiDrag } from '@mdi/js'
	import { onMount } from 'svelte'
	import Tree from '../components/Tree.svelte'

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

	type NestedList = {
		name: string
		childs?: NestedList[]
	}
	let nestedList: NestedList[] = [
		{
			name: '1'
		},
		{
			name: '2',
			childs: [
				{
					name: '2.1'
				},
				{
					name: '2.2',
					childs: [
						{
							name: '2.2.1'
						},
						{
							name: '2.2.2'
						}
					]
				}
			]
		},
		{
			name: '3',
			childs: [
				{
					name: '3.1'
				}
			]
		},
		{
			name: '4'
		}
	]

	onMount(() => {
		loadData()
	})

	function updateList(from: HTMLElement, to: HTMLElement) {
		// console.log(list1, list2)
		// const fromListNumber = from.getAttribute('data-list')
		// const fromList = fromListNumber === '1' ? list1 : list2
		// const fromIndex = from.getAttribute('data-item')
		// const toListNumber = to.getAttribute('data-list')
		// const toList = toListNumber === '1' ? list1 : list2
		// const toIndex = to.getAttribute('data-item')
		// const item = fromList.splice(+fromIndex, 1)
		// toList.splice(+toIndex, 0, item[0])
		// list1[1] = 'pepito'
		// list2 = list2
	}
</script>

<Section title="Draggable">
	<div>
		<strong>Simple</strong>
		<div
			class="scrollable"
			use:draggable={{
				dropZoneSelector: '.scrollable',
				handlerSelector: '.simple-handler',
				draggableSelector: '.simple-draggable',
				onChange: updateList
			}}
		>
			{#each photos as photo (photo.id)}
				<div class="d-flex align-center gap-2 simple-draggable handler n-200 pa-2 mb-2">
					<img src={photo.thumbnailUrl} alt="ssss" width="150" height="150" />
					<p class="title">{photo.title}</p>
					<button class="btn icon ml-auto simple-handler">
						<CIcon icon={mdiDrag} />
					</button>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<strong>Two list</strong>
		<div
			class="two-list d-grid gap-2"
			use:draggable={{
				dropZoneSelector: '.droppable-zone',
				handlerSelector: '.handler',
				draggableSelector: '.draggable',
				onChange: updateList
			}}
		>
			<div class="my-4 d-grid gap-4 droppable-zone">
				{#each list1 as item, i}
					<div data-list="1" data-item={i} class="d-flex align-center gap-2 n-200 pa-3 draggable">
						<p class="title">{item}</p>
						<button class="btn icon tonal ml-auto handler">
							<CIcon icon={mdiDrag} />
						</button>
					</div>
				{/each}
			</div>
			<div class="pa-5 card droppable-zone">algo que no es droppable</div>
			<div class="my-4 d-grid gap-4 droppable-zone">
				{#each list2 as item, i}
					<div data-list="2" data-item={i} class="d-flex align-center gap-2 n-200 pa-3 draggable">
						<p class="title">{item}</p>
						<button class="btn icon tonal ml-auto handler">
							<CIcon icon={mdiDrag} />
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div>
		<strong>Nested tree</strong>
		<div
			use:draggable={{
				dropZoneSelector: '.tree-drop-zone',
				handlerSelector: '.tree-handler',
				draggableSelector: '.tree-item',
				onChange: updateList
			}}
			class="tree-drop-zone"
		>
			<Tree list={nestedList} />
		</div>
	</div>
</Section>

<style>
	.two-list {
		--xs-columns: repeat(3, 1fr);
	}
	.scrollable {
		max-height: 700px;
		overflow: auto;
	}
	.draggable {
		border-radius: var(--size-1);
		transition: transform 150ms;
	}
</style>
