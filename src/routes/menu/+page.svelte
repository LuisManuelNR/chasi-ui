<script>
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { CMenu } from '$lib/index.js'
	import { mdiDotsVertical } from '@mdi/js'
</script>

<CMenu closeonclick={false} direction="right">
	<button class="btn icon ghost">
		<CIcon icon={mdiDotsVertical}></CIcon>
	</button>
	{#snippet content()}
		<div class="pa-4 s-2">
			<button class="list-item rows full-width">Lorem, ipsum.</button>
			<button class="list-item rows full-width">Lorem ipsum dolor sit.</button>
			<button class="list-item rows full-width">Lorem.</button>

			<CMenu direction="right">
				<button class="list-item rows full-width">
					<CIcon icon={mdiDotsVertical}></CIcon>
				</button>
				{#snippet content()}
					<div class="pa-4 s-2">
						<button class="list-item rows full-width">Lorem, ipsum.</button>
						<button class="list-item rows full-width">Lorem ipsum dolor sit.</button>
						<button class="list-item rows full-width">Lorem.</button>
					</div>
				{/snippet}
			</CMenu>
		</div>
	{/snippet}
</CMenu>

<CMenu closeonclick={false} direction="right">
	<button class="btn icon ghost">
		<CIcon icon={mdiDotsVertical}></CIcon>
	</button>
	{#snippet content()}
		<div class="pa-4 s-2">
			<button class="list-item rows full-width">AAAAAA</button>
			<button class="list-item rows full-width">BBBBBB</button>
			<button class="list-item rows full-width">Lorem.</button>

			<CMenu direction="right">
				<button class="list-item rows full-width">
					<CIcon icon={mdiDotsVertical}></CIcon>
				</button>
				{#snippet content()}
					<div class="pa-4 s-2">
						<button class="list-item rows full-width">AAAAAA</button>
						<button class="list-item rows full-width">BBBBBB.</button>
						<button class="list-item rows full-width">Lorem.</button>
					</div>
				{/snippet}
			</CMenu>
		</div>
	{/snippet}
</CMenu>
