<script lang="ts">
	import CDialog from '$lib/CDialog/CDIalog.svelte'

	let active = $state(false)
</script>

<button class="btn" onclick={() => (active = !active)}> open dialog </button>

<CDialog bind:active class="bg pa-4">
	<p class="s-size-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, doloribus. Ducimus, esse fuga
		necessitatibus provident porro accusantium, maiores, reprehenderit sunt sint doloremque dolore
		repellendus voluptate modi quasi. Saepe, ad voluptate.
	</p>
</CDialog>
