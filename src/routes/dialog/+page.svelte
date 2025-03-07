<script lang="ts">
	import CDialog from '$lib/CDialog/CDIalog.svelte'
</script>

<CDialog class="bg pa-4" persistent>
	{#snippet action(open)}
		<button class="btn" onclick={open}> open dialog </button>
	{/snippet}

	{#snippet children(close)}
		<p class="s-size-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit</p>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, doloribus. Ducimus, esse fuga
			necessitatibus provident porro accusantium, maiores, reprehenderit sunt sint doloremque dolore
			repellendus voluptate modi quasi. Saepe, ad voluptate.
		</p>
		<CDialog class="bg pa-4">
			{#snippet action(open)}
				<button class="btn" onclick={open}> open another dialog </button>
			{/snippet}

			{#snippet children(close)}
				<p class="s-size-5">Otro</p>
				<button class="btn" onclick={close}> close dialog </button>
			{/snippet}
		</CDialog>
		<button class="btn" onclick={close}> close dialog </button>
	{/snippet}
</CDialog>
