<script lang="ts">
	import Section from './Section.svelte'
	import { CDialog } from '$lib'
</script>

<Section title="Dialogs">
	<CDialog let:close>
		<p class="text-h6">Hey im a dialog!!!</p>
		<button on:click={close}>close</button>
	</CDialog>
</Section>
