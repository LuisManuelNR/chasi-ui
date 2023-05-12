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
		const url = 'https://jsonplaceholder.typicode.com/photos?_limit=7'
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
</script>

<Section title="Draggable">
	<!-- <div>
		<strong>Simple</strong>
		<div class="scrollable">
			<CDraggableList bind:list={photos} let:item>
				<div class="d-flex align-center gap-2 draggable n-200 pa-2 mb-2">
					<img src={item.thumbnailUrl} alt="ssss" width="150" height="150" />
					<p class="title">{item.title}</p>
					<button class="btn icon ml-auto handler">
						<CIcon icon={mdiDrag} />
					</button>
				</div>
			</CDraggableList>
		</div>
		<pre>{JSON.stringify(photos, null, 2)}</pre>
	</div> -->

	<!-- <div>
		<strong>Two list</strong>
		<button
			class="btn"
			on:click={() => {
				list1.splice(0, 0, Math.random())
				list1 = list1
			}}
		>
			add item
		</button>
		<div class="two-list d-grid gap-2">
			<CDraggableList bind:list={list1} group="two-list" let:item class="my-4 d-grid gap-4">
				<div class="d-flex align-center gap-2 n-200 pa-3 draggable">
					<div>
						<p class="title">{item}</p>
					</div>
					<button class="btn icon tonal ml-auto handler">
						<CIcon icon={mdiDrag} />
					</button>
				</div>
			</CDraggableList>
			<CDraggableList bind:list={list2} group="two-list" let:item class="my-4 d-grid gap-4">
				<div class="d-flex align-center gap-2 n-200 pa-3 draggable">
					<div>
						<p class="title">{item}</p>
					</div>
					<button class="btn icon tonal ml-auto handler">
						<CIcon icon={mdiDrag} />
					</button>
				</div>
			</CDraggableList>
		</div>
	</div> -->

	<div>
		<strong>Nested tree</strong>
		<Tree bind:list={nestedList} />
		<div>
			<pre>{JSON.stringify(nestedList, null, 2)}</pre>
		</div>
	</div>
</Section>

<style lang="scss">
	.two-list {
		--xs-columns: repeat(2, 1fr);
	}
	.scrollable {
		max-height: 700px;
		overflow: auto;
	}
	.draggable {
		border-radius: var(--size-1);
		transition: transform 150ms;
	}
	pre {
		/* white-space: nowrap; */
		text-overflow: ellipsis;
		overflow: hidden;
	}
	:has(pre) {
		overflow: hidden;
	}
</style>
