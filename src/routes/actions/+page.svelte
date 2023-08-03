<script lang="ts">
	import { pannable, zoomable } from '$lib/Actions/index.js'

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
</script>

<pat-tata>
	<div use:setup>
		<!-- <pre>scale: {scale}</pre> -->
		<aa-bb>
			<p>scale: {scale}</p>
			<p>x: {x}</p>
			<p>y: {y}</p>
		</aa-bb>
	</div>

	<div></div>
	<div></div>
	<div></div>
</pat-tata>

<style>
	aa-bb {
		width: 400px;
	}
	div {
		background-color: var(--s-3);
		height: 600px;
		display: grid;
		place-content: center;
		user-select: none;
	}
	pat-tata {
		display: grid;
		gap: 2rem;
	}
</style>
