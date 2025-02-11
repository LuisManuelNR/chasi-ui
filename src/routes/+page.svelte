<script lang="ts">
	import { CIcon, CNotifier } from '$lib/index.js'
	import { mdiAbTesting, mdiChevronRight } from '@mdi/js'

	let active = $state(false)
</script>

<!-- {#if active}
	<CSidebar onclick={() => (active = false)}>
		<button class="list-item full-width"> una cosa </button>
		<button class="list-item full-width"> otra cosa </button>
		<button class="list-item full-width"> nada nadita </button>
	</CSidebar>
{/if} -->

<button class="btn" onclick={() => (active = true)}> nada nadita </button>

<p>
	<CIcon icon={mdiChevronRight}></CIcon>
	esto es por que si yo te digo <CIcon icon={mdiAbTesting}></CIcon> cuan do no te digo jajajaj
</p>

<button
	class="btn"
	onclick={() => CNotifier.error({ title: 'Ramoncito', text: 'Clavo un clavito' })}
>
	show noti
</button>

<button class="btn" onclick={() => CNotifier.success('Pepito tambien')}> show pepito </button>
