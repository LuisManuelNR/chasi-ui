<script lang="ts">
	import Buttons from './sections/Buttons.svelte'
	import Forms from './sections/Forms.svelte'
	import Dialogs from './sections/Dialogs.svelte'
	import Expands from './sections/Expands.svelte'
	import Sidebar from './sections/Sidebar.svelte'
	import { CSidebar, CIcon } from '$lib'
	import { mdiMenu } from '@mdi/js'
</script>

<CSidebar openState let:open>
	<a href="#d" class="list-item">Lorem ipsum dolor sit amet.</a>
	<a href="#d" class="list-item">Lorem, ipsum dolor.</a>
	<a href="#d" class="list-item">Lorem ipsum dolor sit amet consectetur.</a>
	<a href="#d" class="list-item">Lorem, ipsum.</a>
	<a href="#d" class="list-item">Lorem ipsum dolor sit amet.</a>
	<a href="#d" class="list-item">Lorem, ipsum dolor.</a>
	<button slot="action" class="fab icon" on:click={open}>
		<CIcon icon={mdiMenu} />
	</button>
</CSidebar>

<div class="content grid-area gap-4 py-5">
	<Buttons />
	<Forms />
	<Dialogs />
	<Expands />
	<Sidebar />
</div>

<style lang="scss">
	.content {
		max-width: 1000px;
		margin: 0 auto;
		padding-bottom: 20rem;
		padding-left: var(--c-sidebar-container);
	}
</style>
