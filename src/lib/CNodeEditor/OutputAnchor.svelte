<script lang="ts">
	import { pannable } from '../Actions/index.js'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiCircleSlice8 } from '@mdi/js'

	export let id: string = ''
	export let type: string

	function setup(node: HTMLElement) {
		return pannable(node, {
			onStart(e, coords) {
				e.stopPropagation()
				window.dispatchEvent(
					new CustomEvent('start-connect', { detail: { node, x: coords.x, y: coords.y } })
				)
			},
			onMove(e, coords) {
				window.dispatchEvent(new CustomEvent('move-connect', { detail: coords }))
			},
			onEnd(e, coords) {
				const target = e.target as HTMLElement
				const input = target.closest('[data-anchor-id]')
				window.dispatchEvent(new CustomEvent('stop-connect'))
				if (!input) return
				input.dispatchEvent(new CustomEvent('connect', { detail: { type, id } }))
			}
		})
	}
</script>

<button data-anchor-output={id} class="btn icon ghost data-type {type}" use:setup>
	<CIcon icon={mdiCircleSlice8} />
</button>

<style>
	button {
		color: var(--color);
	}
	.anchor-label {
		color: var(--on-bg);
		text-transform: capitalize;
	}
</style>
