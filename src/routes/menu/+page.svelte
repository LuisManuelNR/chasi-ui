<script>
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { CMenu } from '$lib/index.js'
	import { mdiDotsVertical } from '@mdi/js'
</script>

{#snippet action()}
	<CIcon icon={mdiDotsVertical}></CIcon>
{/snippet}

<CMenu class="btn icon ghost" {action}>
	<div class="pa-4 s-2">
		<button class="list-item rows full-width">Lorem, ipsum.</button>
		<button class="list-item rows full-width">Lorem ipsum dolor sit.</button>
		<button class="list-item rows full-width">Lorem.</button>

		<CMenu text="abrete plis" class="list-item rows full-width" x-axis="right" y-axis="top">
			<div class="pa-4 s-2">
				<button class="list-item rows full-width">Lorem, ipsum.</button>
				<button class="list-item rows full-width">Lorem ipsum dolor sit.</button>
				<button class="list-item rows full-width">Lorem.</button>
			</div>
		</CMenu>
	</div>
</CMenu>
