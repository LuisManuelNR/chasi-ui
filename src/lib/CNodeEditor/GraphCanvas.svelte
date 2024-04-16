<script lang="ts">
	import { pannable, zoomable } from '../Actions/index.js'

	export let height = '600px'
	export let position: number[] = [0, 0]
	export let scale = 1

	function setup(node: HTMLElement) {
		const panAction = pannable(node, {
			onStart(e, coords) {
				e.stopPropagation()
				const target = e.target as HTMLElement
				if (!target.closest('.bg')) return false
			},
			onMove(e, { dx, dy }) {
				position[0] += dx
				position[1] += dy
			}
		})
		const zoomAction = zoomable(node, {
			onZoom(delta, center, isTouch) {
				const canvasBound = node.getBoundingClientRect()
				const amount = delta > 0 ? 0.9 : 1.1
				scale *= amount
				const offestCenterX = center.x - canvasBound.left
				const offestCenterY = center.y - canvasBound.top
				position[0] = offestCenterX - (offestCenterX - position[0]) * amount
				position[1] = offestCenterY - (offestCenterY - position[1]) * amount
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

<div class="graph-canvas" role="presentation" style:min-height={height} use:setup>
	<div class="header">
		<slot name="header" />
	</div>
	<svg class="bg">
		<defs>
			<pattern
				id="graph-pattern"
				x={position[0]}
				y={position[1]}
				width={scale * 22}
				height={scale * 22}
				patternUnits="userSpaceOnUse"
			>
				<circle r="1" cx={scale * 11} cy={scale * 11} />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#graph-pattern)" opacity={scale * 0.2} />
	</svg>
	<div
		class="canvas"
		style="transform: translate3d({position[0]}px, {position[1]}px, 0px) scale({scale});"
	>
		<slot {position} {scale} />
	</div>
	<div class="footer">
		<slot name="footer" />
	</div>
</div>

<style lang="scss">
	.graph-canvas {
		width: 100%;
		position: relative;
		overflow: hidden;
		outline: 1px solid var(--s-1);
		border-radius: var(--size-1);
		user-select: none;
		isolation: isolate;
		.bg,
		.canvas {
			position: absolute;
			width: 0;
			height: 0;
			transform-origin: 0 0;
			circle {
				fill: var(--on-s-4);
			}
		}
		.bg {
			width: 100%;
			height: 100%;
		}
		.header,
		.footer {
			position: absolute;
			inset-inline: 0;
			pointer-events: all;
		}
		.footer {
			bottom: 0;
		}
	}
</style>
