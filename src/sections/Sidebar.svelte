<script lang="ts">
	import Section from './Section.svelte'
	import { CSidebar } from '$lib'
</script>

<Section title="Sidebars">
	<CSidebar let:open right>
		<a href="#d" class="list-item">Lorem ipsum dolor sit amet.</a>
		<a href="#d" class="list-item">Lorem, ipsum dolor.</a>
		<a href="#d" class="list-item">Lorem ipsum dolor sit amet consectetur.</a>
		<a href="#d" class="list-item">Lorem, ipsum.</a>
		<a href="#d" class="list-item">Lorem ipsum dolor sit amet.</a>
		<a href="#d" class="list-item">Lorem, ipsum dolor.</a>
		<button class="btn" slot="action" on:click={open}> open sidebar </button>
	</CSidebar>
</Section>
