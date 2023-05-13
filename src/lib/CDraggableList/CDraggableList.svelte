<script lang="ts" context="module">
	import { writable } from 'svelte/store'

	const ghost = writable<ReturnType<typeof cloneElement> | undefined>()
	const selectedItem = writable<any | undefined>()

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
			dispose(): Promise<void> {
				this.disposing = true
				return new Promise((resolve) => {
					const elBound = el.getBoundingClientRect()
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
	function getHeight(element: Element): number {
		const elBound = element.getBoundingClientRect()
		const nextBound = element.nextElementSibling
			? element.nextElementSibling.getBoundingClientRect()
			: { top: 0 }
		const diff = nextBound.top - elBound.top
		return diff > 0 ? diff : elBound.height
	}

	function randomStr() {
		return Math.random().toString(36).slice(-5)
	}

	function getElementIndex(el: Element) {
		if (!el.parentElement) return 0
		let i = 0
		while (el.parentElement.children[i] != el) i++
		return i
	}
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
	import { onMount, tick } from 'svelte'

	type T = $$Generic
	export let list: T[] = []
	export let group: string = `default-group-${randomStr()}`
	export let handlerSelector = '.handler'
	export let ignoreHandler = '.ignore-handler'
	let klass = ''
	export { klass as class }

	const DRAGGABBLE_SELECTOR = '.draggable'

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
			$ghost = cloneElement(draggable)
			displace = createDisplacement(draggable)
			fromIndex = getElementIndex(draggable)

			lastDropZone = draggable.parentElement!
			lastDropZone.classList.add('selected')
			lastDropZone.append(draggable)
			draggable.style.opacity = '0'
			draggable.style.pointerEvents = 'none'
			displace(coords, false)
		},
		onMove(event, coords) {
			if ($ghost && !$ghost.disposing && draggable) {
				$ghost.translate(coords.dx, coords.dy)
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
			}
		},
		onEnd: async (event, coords) => {
			if ($ghost && !$ghost.disposing && lastDropZone && draggable) {
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
		return (cursor: { x: number; y: number }, transition: boolean) => {
			for (let i = 0; i < groups.length; i++) {
				const el = groups[i] as HTMLElement
				el.style.transition = transition ? 'transform 150ms' : 'none'
				if (el !== selectedElement) {
					const { x, y, height, width } = el.getBoundingClientRect()
					if (!el.parentElement!.classList.contains('selected')) {
						el.style.transform = ''
					} else if (cursor.y >= y + height / 2) {
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
	{#each list as item, i (item)}
		<slot {item} index={i} />
	{/each}
</div>

<style>
	.selected {
		box-shadow: inset 0 0 20px var(--success);
		transition: box-shadow 250ms ease;
	}
</style>
