<script lang="ts">
	import Section from './Section.svelte'
	import { CGraph, CPath, CAxisX, CAxisY, min, max } from '$lib/CGraph'
	let sineWave = Array.from({ length: 50 }, (v, i) => Math.sin(i * 0.2))
	const xs1 = sineWave.map((v, i) => i)
	const xs2 = sineWave.map((v, i) => i + 15)
	const domainX: [number, number] = [0, 65]
</script>

<Section title="Graphs">
	<CGraph allowPanX allowZoomX marginLeft="45">
		<CPath y={sineWave} x={xs1} {domainX} width="5" />
		<CPath y={sineWave} x={xs2} {domainX} width="2" color="yellow" />
		<CAxisY domain={[min(sineWave), max(sineWave)]} ticksNumber="5" />
		<CAxisX domain={domainX} />
	</CGraph>
</Section>
