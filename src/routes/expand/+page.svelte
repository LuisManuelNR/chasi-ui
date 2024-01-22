<script lang="ts">
	import CExpand from '$lib/CExpand/CExpand.svelte'
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { mdiAbugidaThai, mdiChevronDown } from '@mdi/js'
</script>

<CExpand icon={mdiChevronDown} iconRotation="-180deg" class="s-2">
	<svelte:fragment slot="title">
		<CIcon icon={mdiAbugidaThai}></CIcon>
		Rapiti titirapidi
	</svelte:fragment>
	<div class="s-2 pa-2">este es el cuerpo</div>
</CExpand>
