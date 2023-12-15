<script lang="ts">
	import { pannable, zoomable, observer } from '$lib/Actions/index.js'

	let scale = 1
	let x = 0
	let y = 0
	function setup(node: HTMLElement) {
		const panAction = pannable(node, {
			onMove(e, { dx, dy }) {
				x += dx
				y += dy
			}
		})
		const zoomAction = zoomable(node, {
			onZoom(delta, center, isTouch) {
				scale += delta
			}
		})
		return {
			destroy: () => {
				panAction.destroy()
				zoomAction.destroy()
			}
		}
	}

	function onIntersect(name: string) {
		return () => {
			console.log('im in viewport mom!!!', name)
		}
	}
</script>

<pat-tata>
	<!-- <div use:setup>
		<aa-bb>
			<p>scale: {scale}</p>
			<p>x: {x}</p>
			<p>y: {y}</p>
		</aa-bb>
	</div> -->

	<div use:observer={{ onIntersect: onIntersect('EL Primero'), once: true }}></div>
	<div use:observer={{ onIntersect: onIntersect('EL Segundo') }}></div>
	<div use:observer={{ onIntersect: onIntersect('EL Tercero'), once: true }}></div>
</pat-tata>

<style>
	div {
		background-color: var(--s-3);
		height: 1000px;
		display: grid;
		place-content: center;
		user-select: none;
	}
	pat-tata {
		display: grid;
		gap: 2rem;
	}
</style>
