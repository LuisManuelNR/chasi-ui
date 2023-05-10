<script lang="ts" context="module">
	import { writable } from 'svelte/store'

	let ghost: ReturnType<typeof cloneElement> | undefined
	let LastDropZone: HTMLElement | null = writable()

	function cloneElement(el: Element) {
		const { top, left, width, height } = el.getBoundingClientRect()
		const clone = el.cloneNode(true) as HTMLElement
		clone.style.position = 'fixed'
		clone.style.top = `${top}px`
		clone.style.left = `${left}px`
		clone.style.width = `${width}px`
		clone.style.height = `${height}px`
		clone.style.pointerEvents = 'none'
		clone.style.transition = 'none'
		clone.style.opacity = '0.1'

		let x = 0
		let y = 0

		document.body.append(clone)
		return {
			disposing: false,
			translate(dx: number, dy: number) {
				x += dx
				y += dy
				clone.style.transform = `translate3d(${x}px, ${y}px, 0)`
			},
			dispose(node: HTMLElement): Promise<void> {
				this.disposing = true
				return new Promise((resolve) => {
					const elBound = node.getBoundingClientRect()
					const dy = elBound.y - top - y
					const dx = elBound.x - left - x
					clone.style.transition = 'all 100ms'
					clone.style.opacity = '1'
					clone.style.width = `${elBound.width}px`
					clone.style.height = `${elBound.height}px`
					if (!x && !y) {
						this.translate(dx, dy)
						this.disposing = false
						clone.remove()
						resolve()
					} else {
						onTransitionEnd(clone, () => {
							clone.remove()
							this.disposing = false
							resolve()
						})
						this.translate(dx, dy)
					}
				})
			}
		}
	}
	function onTransitionEnd(el: HTMLElement, callback: (e: TransitionEvent) => void) {
		const getTransitionName = () => {
			const transitions = {
				transition: 'transitionend',
				OTransition: 'oTransitionEnd',
				MozTransition: 'transitionend',
				WebkitTransition: 'webkitTransitionEnd'
			}
			for (const key in transitions) {
				//@ts-ignore
				if (el.style[key] !== undefined) {
					//@ts-ignore
					return transitions[key]
				}
			}
		}
		el.addEventListener(getTransitionName(), callback, { once: true })
	}
</script>

<script lang="ts">
	import type { PannableParams } from '../Actions/pannable'
	import { pannable } from '../Actions'
	import { onMount } from 'svelte'
	type T = $$Generic
	export let list: T[] = []
	export let group: string = `default-group-${Math.random().toString(36).slice(-5)}`
	export let handlerSelector = '.handler'

	const DRAGGABBLE_SELECTOR = '.draggable'

	let lastList: T[] | undefined

	let displace: ReturnType<typeof createDisplacement>
	let height = 0
	let draggable: HTMLElement | null = null
	let root: HTMLElement
	let rootSelected = false

	let draggableIndex = 0
	let draggableItem: unknown

	onMount(() => {
		// @ts-ignore
		root.__removeItem = removeItem
		// @ts-ignore
		root.__addItem = addItem
	})

	const actions: PannableParams = {
		onStart(event, coords) {
			if (ghost) return
			const evTarget = event.target as HTMLElement
			const handler = evTarget.closest(handlerSelector)
			if (!handler) return
			draggable = handler.closest(DRAGGABBLE_SELECTOR) as HTMLElement
			if (!draggable) return
			event.preventDefault()
			const rootBound = root.getBoundingClientRect()
			height = getHeight(draggable)
			ghost = cloneElement(draggable)
			displace = createDisplacement()
			draggableIndex = [...root.children].indexOf(draggable)
			root.style.height = `${rootBound.height}px`
			draggableItem = removeItem(draggableIndex)
			displace(height, coords, false)
		},
		onMove(event, coords) {
			if (ghost && !ghost.disposing && draggable) {
				ghost.translate(coords.dx, coords.dy)
				const evTarget = document.elementFromPoint(coords.x, coords.y) as HTMLElement
				const dropZone = evTarget && (evTarget.closest(`.draggable-list.${group}`) as HTMLElement)
				if (dropZone && LastDropZone !== dropZone) {
					rootSelected = dropZone === root
					LastDropZone = dropZone
					// 	let lastList = list
					// 	if (LastDropZone) {
					// 		lastList = LastDropZone.__DRAGGABLE_LIST__
					// 	}
					// 	LastDropZone = dropZone
					// 	const newList = dropZone.__DRAGGABLE_LIST__
					// 	moveItem(lastList, newList, draggableIndex, list.length - 1)
					// 	dropZone.append(draggable)
				}
				displace(height, coords, true)
			}
		},
		onEnd: async (event, coords) => {
			// if (ghost && !ghost.disposing && lastList && draggable) {
			// 	let toIndex = 0
			// 	rootSelected = false
			// 	if (lastList.length) {
			// 		let inserted
			// 		for (let i = 0; i < lastList.length; i++) {
			// 			const item = lastList[i] as HTMLElement
			// 			el.style.transition = 'none'
			// 			if (el.style.transform && !inserted) {
			// 				inserted = true
			// 				LastDropZone.insertBefore(draggable, el)
			// 				toIndex = i
			// 			}
			// 			if (i === LastDropZone.children.length - 1 && !inserted) {
			// 				LastDropZone.append(draggable)
			// 				toIndex = i
			// 			}
			// 			el.style.transform = ''
			// 		}
			// 	} else {
			// 		LastDropZone.append(draggable)
			// 	}
			// 	await ghost.dispose(draggable)
			// 	draggable.style.opacity = ''
			// 	LastDropZone = null
			// 	draggable = null
			// 	ghost = undefined
			// }
		}
	}

	function removeItem(index: number) {
		const item = list.splice(index, 1)
		list = list
		return item[0]
	}

	function addItem(index: number, item: T) {
		list.splice(index, 0, item)
		list = list
	}

	function moveItem(fromList: unknown[], toList: unknown[], fromIndex: number, toIndex: number) {
		const cloneFrom = structuredClone(fromList)
		const cloneTo = structuredClone(toList)
		const item = cloneFrom.splice(fromIndex, 1)
		cloneTo.splice(toIndex, 0, item[0])
		fromList = []
		// list = cloneFrom
		// list = cloneTo
	}

	function getHeight(element: Element): number {
		const elBound = element.getBoundingClientRect()
		const nextBound = element.nextElementSibling
			? element.nextElementSibling.getBoundingClientRect()
			: { top: 0 }
		const diff = nextBound.top - elBound.top
		return diff > 0 ? diff : elBound.height
	}

	function createDisplacement() {
		const groups = document.querySelectorAll(`.draggable-list.${group}`)
		console.log(groups)
		const items: Element[] = []
		for (let i = 0; i < groups.length; i++) {
			items.push(...groups[i].children)
		}
		return (amount = 100, cursor: { x: number; y: number }, transition: boolean) => {
			for (let i = 0; i < items.length; i++) {
				const el = items[i] as HTMLElement
				el.style.transition = transition ? 'transform 150ms' : 'none'
				const { x, y, height, width } = el.getBoundingClientRect()
				if (el.parentElement !== LastDropZone) {
					el.style.transform = ''
				} else if (cursor.y >= y + height / 2) {
					el.style.transform = ''
				} else {
					el.style.transform = `translate3d(0px, ${amount}px, 0)`
				}
			}
		}
	}
</script>

<div
	class="draggable-list {group}"
	class:selected={root === LastDropZone}
	use:pannable={actions}
	bind:this={root}
>
	{#each list as item, i (`${group}-${i}`)}
		<slot {item} />
	{/each}
</div>

<style>
	.draggable-list {
		overflow: hidden;
	}
	.selected {
		box-shadow: inset 0 0 20px var(--success);
		transition: box-shadow 250ms ease;
	}
</style>
