<script lang="ts">
	import Section from './Section.svelte'
	import { CGraph, CPath, CCircle, CAxisX, CAxisY, min, max, CRect } from '$lib/CGraph'
	import { onMount } from 'svelte'
	let sineWave = Array.from({ length: 50 }, (v, i) => Math.sin(i * 0.2))
	onMount(() => {
		setInterval(() => {
			sineWave = [...sineWave, Math.sin(sineWave.length * 0.2)]
			if (sineWave.length > 250) {
				// es un array.pop() pero reactivo
				sineWave = [...sineWave.slice(0, sineWave.length - 1)]
			}
		}, 1000)
	})
</script>

<Section title="Graphs">
	<CGraph allowPanX allowZoomX marginLeft="45">
		<CPath y={sineWave} width="5" />
		<CAxisY domain={[min(sineWave), max(sineWave)]} ticksNumber="5" />
		<CAxisX domain={[0, sineWave.length]} />
	</CGraph>
</Section>
