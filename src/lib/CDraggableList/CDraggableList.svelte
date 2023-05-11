<script lang="ts" context="module">
	import { writable } from 'svelte/store'
	interface CurrentDropZone {
		el: HTMLElement | null
		list: unknown[]
	}
	interface CurrentItem {
		item: unknown
		itemElement: HTMLElement | null
		displaceGap: number
	}
	const ghost = writable<ReturnType<typeof cloneElement> | undefined>()
	const currentDropZone = writable<CurrentDropZone>({
		el: null,
		list: []
	})
	const currentItem = writable<CurrentItem>({
		item: undefined,
		itemElement: null,
		displaceGap: 0
	})

	interface Groups {
		[key: string]: {
			[key: string]: unknown[]
		}
	}

	const groups = writable<Groups>({})

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
		clone.style.opacity = '0.5'

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
	export let group: string = `default-group-${randomStr()}`
	export let handlerSelector = '.handler'
	let klass = ''
	export { klass as class }

	const DRAGGABBLE_SELECTOR = '.draggable'

	let displace: ReturnType<typeof createDisplacement>
	const hash = randomStr()

	onMount(() => {
		if (!$groups[group]) $groups[group] = {}
		$groups[group][hash] = list
	})

	const actions: PannableParams = {
		onStart(event, coords) {
			if ($ghost) return
			const evTarget = event.target as HTMLElement
			const handler = evTarget.closest(handlerSelector)
			if (!handler) return
			const draggable = handler.closest(DRAGGABBLE_SELECTOR) as HTMLElement
			if (!draggable) return
			event.preventDefault()
			displace = createDisplacement()
			// const draggableIndex = [...draggable.parentElement!.children].indexOf(draggable)
			$currentItem.itemElement = draggable
			$currentItem.displaceGap = getHeight(draggable)
			// $currentItem.item = list.at(draggableIndex)
			$ghost = cloneElement(draggable)
			draggable.style.opacity = '0'
			// draggableItem = removeItem(draggableIndex)
			draggable.parentElement!.append(draggable)
			displace($currentItem.displaceGap, coords, false)
		},
		onMove(event, coords) {
			if ($ghost && !$ghost.disposing && $currentItem.itemElement) {
				$ghost.translate(coords.dx, coords.dy)
				const evTarget = document.elementFromPoint(coords.x, coords.y) as HTMLElement
				const dropZone = evTarget && (evTarget.closest(`.draggable-list.${group}`) as HTMLElement)
				if (dropZone && $currentDropZone.el !== dropZone) {
					if ($currentDropZone.el) $currentDropZone.el.classList.remove('selected')
					$currentDropZone.el = dropZone
					$currentDropZone.el.classList.add('selected')
					dropZone.append($currentItem.itemElement)
				}
				displace($currentItem.displaceGap, coords, true)
			}
		},
		onEnd: async (event, coords) => {
			if ($ghost && !$ghost.disposing && $currentDropZone.el && $currentItem.itemElement) {
				$currentDropZone.el.classList.remove('selected')
				if ($currentDropZone.el.children.length) {
					let inserted
					for (let i = 0; i < $currentDropZone.el.children.length; i++) {
						const el = $currentDropZone.el.children[i] as HTMLElement
						el.style.transition = 'none'
						if (el.style.transform && !inserted) {
							inserted = true
							$currentDropZone.el.insertBefore($currentItem.itemElement, el)
						}
						if (i === $currentDropZone.el.children.length - 1 && !inserted) {
							$currentDropZone.el.append($currentItem.itemElement)
						}
						el.style.transform = ''
					}
				} else {
					$currentDropZone.el.append($currentItem.itemElement)
				}
				await $ghost.dispose($currentItem.itemElement)
				$currentItem.itemElement.style.opacity = '1'
				$currentItem.itemElement = null
				$currentDropZone.el = null
				$ghost = undefined
			}
		}
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
		const items: Element[] = []
		for (let i = 0; i < groups.length; i++) {
			items.push(...groups[i].children)
		}
		return (amount = 100, cursor: { x: number; y: number }, transition: boolean) => {
			for (let i = 0; i < items.length; i++) {
				const el = items[i] as HTMLElement
				if (el !== $currentItem.itemElement) {
					el.style.transition = transition ? 'transform 150ms' : 'none'
					const { x, y, height, width } = el.getBoundingClientRect()
					if (el.parentElement !== $currentItem.itemElement?.parentElement) {
						el.style.transform = ''
					} else if (cursor.y >= y + height / 2) {
						el.style.transform = ''
					} else {
						el.style.transform = `translate3d(0px, ${amount}px, 0)`
					}
				}
			}
		}
	}

	function randomStr() {
		return Math.random().toString(36).slice(-5)
	}
</script>

<div class="draggable-list {group} {klass}" data-ref={hash} use:pannable={actions}>
	{#each list as item}
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
