<script lang="ts">
	import Section from './Section.svelte'
	import { CGraph, CPath, CAxisX, CAxisY, min, max, CObject } from '$lib/CGraph'
	let sineWave = Array.from({ length: 45 }, (v, i) => Math.sin(i * 0.1))
	const xs1 = Array.from({ length: 45 }, (v, i) => i)

	function middle(what: number, offset: number) {
		const mid = what / 2
		return mid - offset / 2
	}
</script>

<Section title="Graphs">
	<CGraph allowPanX allowZoomX marginLeft="45">
		<CPath y={sineWave} x={xs1} width="5" />
		<CAxisY domain={[min(sineWave), max(sineWave)]} />
		<CAxisX domain={[min(xs1), max(xs1)]} />
	</CGraph>
	<CGraph allowPan allowZoom let:width let:height>
		<CAxisX domain={[0, width]} ticksNumber="5" formatValue={(v) => `${v}px`} />
		<CObject
			domainX={[0, width]}
			domainY={[height, 0]}
			x={middle(width, 200)}
			y={middle(height, 100)}
			width="200"
			height="600"
		>
			<div class="card">
				<p>Hello world!!</p>
			</div>
		</CObject>
		<CObject x={0} y={0}>
			<div class="card">
				<p>Hello Home!! {width} {height}</p>
			</div>
		</CObject>
	</CGraph>
</Section>

<style>
	.card {
		width: 98%;
		height: 98%;
		box-shadow: var(--shadow-3);
	}
</style>
