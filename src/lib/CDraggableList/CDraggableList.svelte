<script lang="ts" context="module">
	import { writable } from 'svelte/store'
	import {
		createScroller,
		cloneElement,
		getHeight,
		randomStr,
		getElementIndex
	} from './draggable-api'

	const ghost = writable<ReturnType<typeof cloneElement> | undefined>()
	const selectedItem = writable<any | undefined>()
	const scroller = writable<ReturnType<typeof createScroller> | undefined>()

	function moveItem(fromHash: string, hash: string, from?: number, to?: number) {
		const evRemove = new CustomEvent(`draggable-remove-${fromHash}`, { detail: from })
		const evAdd = new CustomEvent(`draggable-add-${hash}`, { detail: to })
		window.dispatchEvent(evRemove)
		window.dispatchEvent(evAdd)
	}
</script>

<script lang="ts">
	import type { PannableParams } from '../Actions/pannable'
	import { pannable } from '../Actions'
	import { createEventDispatcher, onMount, tick } from 'svelte'

	type T = $$Generic
	export let list: T[] = []
	export let group: string = `default-group-${randomStr()}`
	export let handlerSelector = '.handler'
	export let ignoreHandler = '.ignore-handler'
	// @ts-ignore
	export let uid: T extends Record<string, any> ? keyof T : undefined = undefined
	let klass = ''
	export { klass as class }

	const DRAGGABBLE_SELECTOR = '.draggable'
	const dispatch = createEventDispatcher<{
		change: T[]
	}>()

	let displace: ReturnType<typeof createDisplacement>
	const hash = randomStr()

	onMount(() => {
		// @ts-ignore
		window.addEventListener(`draggable-remove-${hash}`, removeItem)
		// @ts-ignore
		window.addEventListener(`draggable-add-${hash}`, addItem)
		return () => {
			// @ts-ignore
			window.removeEventListener(`draggable-remove-${hash}`, removeItem)
			// @ts-ignore
			window.removeEventListener(`draggable-add-${hash}`, addItem)
		}
	})

	let lastDropZone: HTMLElement | null
	let draggable: HTMLElement | null
	let fromIndex = 0

	const actions: PannableParams = {
		onStart(event, coords) {
			if ($ghost) return
			const evTarget = event.target as HTMLElement
			const isIgnore = evTarget.closest(ignoreHandler)
			if (isIgnore) return
			const handler = evTarget.closest(handlerSelector)
			if (!handler) return
			draggable = handler.closest(DRAGGABBLE_SELECTOR) as HTMLElement
			if (!draggable) return
			event.preventDefault()
			$scroller = createScroller(draggable, coords.x, coords.y)
		},
		onMove(event, coords) {
			if ($ghost && !$ghost.disposing && draggable && $scroller) {
				$ghost.translate(coords.dx, coords.dy)
				$scroller.updateCursor(coords.x, coords.y)
				const evTarget = document.elementFromPoint(coords.x, coords.y) as HTMLElement
				const dropZone = evTarget && (evTarget.closest(`.draggable-list.${group}`) as HTMLElement)
				if (dropZone && lastDropZone !== dropZone) {
					if (lastDropZone) {
						lastDropZone.classList.remove('selected')
					}
					lastDropZone = dropZone
					lastDropZone.classList.add('selected')
					lastDropZone.append(draggable)
				}
				displace(coords, true)
			} else if (draggable) {
				$ghost = cloneElement(draggable)
				displace = createDisplacement(draggable)
				fromIndex = getElementIndex(draggable)
				lastDropZone = draggable.parentElement!
				lastDropZone.classList.add('selected')
				lastDropZone.append(draggable)
				draggable.style.opacity = '0'
				draggable.style.pointerEvents = 'none'
				displace(coords, false)
			}
		},
		onEnd: async (event, coords) => {
			if ($scroller) {
				$scroller.dispose()
			}
			if ($ghost && !$ghost.disposing && lastDropZone && draggable && $scroller) {
				const toHash = lastDropZone.getAttribute('data-ref')!
				const transformedElements = lastDropZone.querySelectorAll('[style*=translate3d]')
				for (let i = 0; i < transformedElements.length; i++) {
					const el = transformedElements[i] as HTMLElement
					el.style.transition = 'none'
					if (i === 0) {
						lastDropZone.insertBefore(draggable, el)
					}
					el.style.transform = ''
				}
				lastDropZone.classList.remove('selected')
				await $ghost.dispose()
				draggable.style.opacity = ''
				draggable.style.pointerEvents = ''
				$ghost = undefined
				lastDropZone = null
				const toIndex = getElementIndex(draggable)
				moveItem(hash, toHash, fromIndex, toIndex)
				draggable = null
				dispatch('change', list)
			}
		}
	}

	async function addItem(e: CustomEvent) {
		await tick()
		const index = e.detail === undefined || e.detail === null ? list.length : e.detail
		list.splice(index, 0, $selectedItem)
		list = list
	}
	function removeItem(e: CustomEvent) {
		const index = e.detail === undefined || e.detail === null ? list.length - 1 : e.detail
		$selectedItem = list.splice(index, 1)[0]
		list = list
	}

	function createDisplacement(selectedElement: HTMLElement) {
		const groups = document.querySelectorAll(`.draggable-list.${group} ${DRAGGABBLE_SELECTOR}`)
		const displaceGap = getHeight(selectedElement)
		const bounds = new Map()
		for (let i = 0; i < groups.length; i++) {
			const el = groups[i]
			const bound = el.getBoundingClientRect()
			bounds.set(el, bound)
		}
		return (cursor: { x: number; y: number }, transition: boolean) => {
			for (let i = 0; i < groups.length; i++) {
				const el = groups[i] as HTMLElement
				el.style.transition = transition ? 'transform 150ms ease' : 'none'
				if (el !== selectedElement) {
					const { y, height } = bounds.get(el)
					const _y = $scroller ? y - $scroller.deltaScroll() : y
					if (!el.parentElement!.classList.contains('selected')) {
						el.style.transform = ''
					} else if (cursor.y >= _y + height / 2) {
						el.style.transform = ''
					} else {
						el.style.transform = `translate3d(0px, ${displaceGap}px, 0)`
					}
				}
			}
		}
	}
</script>

<div class="draggable-list {group} {klass}" data-ref={hash} use:pannable={actions}>
	{#each list as item, i (uid ? item[uid] : item)}
		<slot {item} index={i} />
	{/each}
</div>

<style>
	.selected {
		box-shadow: inset 0 0 20px var(--success);
		transition: box-shadow 250ms ease;
	}
</style>
