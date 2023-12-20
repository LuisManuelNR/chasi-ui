<script lang="ts">
	import { CIcon, CNotifier } from '$lib'
	import { draggable } from '$lib/Actions/index.js'
	import { isAnimating } from '$lib/utils.js'
	import { mdiDrag } from '@mdi/js'
	import { onMount, tick } from 'svelte'
	import { flip } from 'svelte/animate'
	// import Tree from './Tree.svelte'

	type Photo = {
		albumId: number
		id: number
		title: string
		url: string
		thumbnailUrl: string
	}
	let photos: Photo[] = []

	async function loadData() {
		const url = 'https://jsonplaceholder.typicode.com/photos?_limit=5'
		const response = await fetch(url)
		const list = (await response.json()) as Photo[]
		photos = list.map((p) => ({ ...p, thumbnailUrl: `https://i.pravatar.cc/70?u=${p.id}` }))
	}

	function sleep(ms = 3000) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	function makeDraggable(node: HTMLElement) {
		return draggable(node, {
			duration: 250,
			handlerSelector: '.handler',
			onStart() {
				//
			},
			onMove(source, target) {
				const targetItem = target.closest('[data-index]')
				if (!targetItem) return
				if (isAnimating(targetItem)) return
				const targetIndex = targetItem.getAttribute('data-index')
				if (!targetIndex) return
				const sourceIndex = source.getAttribute('data-index')
				if (!sourceIndex) return
				if (sourceIndex === targetIndex) return
				const photo = photos.splice(+sourceIndex, 1)[0]
				photos.splice(+targetIndex, 0, photo)
				photos = photos
			},
			onDrop(source, target, coords) {
				//
			}
		})
	}

	onMount(() => {
		loadData()
	})
</script>

<!-- <Tree bind:family={familyData}></Tree> -->

<h2>Sort list on move item</h2>
<div class="list-wrapper">
	{#each photos as photo, i (photo.id)}
		<div animate:flip={{ duration: 250 }} use:makeDraggable data-index={i} class="item s-2">
			<div class="d-grid gap-2 pa-2 mb-2" style:--xs-columns="150px 1fr auto">
				<img src={photo.thumbnailUrl} alt="ssss" width="150" height="150" />
				<div>
					<p class="f-size-3">{photo.id}</p>
					<p>{photo.title}</p>
				</div>
				<button class="btn icon ml-auto handler">
					<CIcon icon={mdiDrag} />
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.list-wrapper {
		overflow: hidden;
	}
</style>
