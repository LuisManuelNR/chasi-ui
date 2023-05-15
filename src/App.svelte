<script lang="ts">
	import Buttons from './sections/Buttons.svelte'
	import Forms from './sections/Forms.svelte'
	import Dialogs from './sections/Dialogs.svelte'
	import Expands from './sections/Expands.svelte'
	import Sidebar from './sections/Sidebar.svelte'
	import ImageUplodaer from './sections/ImageUplodaer.svelte'
	import Draggable from './sections/Draggable.svelte'
	import Graphs from './sections/Graphs.svelte'
	import Avatar from './sections/Avatar.svelte'
	import Menu from './sections/Menu.svelte'
	import { CSidebar, CIcon } from '$lib'
	import { mdiMenu } from '@mdi/js'
</script>

<CSidebar openState let:open>
	<a href="#Buttons" class="list-item">Buttons</a>
	<a href="#Forms" class="list-item">Forms</a>
	<a href="#Dialogs" class="list-item">Dialogs</a>
	<a href="#Expands" class="list-item">Expands</a>
	<a href="#Sidebars" class="list-item">Sidebars</a>
	<a href="#ImageUplodaer" class="list-item">ImageUplodaer</a>
	<a href="#Draggable" class="list-item">Draggable</a>
	<a href="#Graphs" class="list-item">Graphs</a>
	<a href="#Avatar" class="list-item">Avatar</a>
	<a href="#Menu" class="list-item">Menu</a>
	<button slot="action" class="btn fab icon" on:click={open}>
		<CIcon icon={mdiMenu} />
	</button>
</CSidebar>

<div class="content grid-area gap-4 py-5">
	<Buttons />
	<Forms />
	<Dialogs />
	<Expands />
	<Sidebar />
	<ImageUplodaer />
	<Draggable />
	<Graphs />
	<Avatar />
	<Menu />
</div>

<style lang="scss">
	.content {
		max-width: 1000px;
		margin: 0 auto;
		padding-bottom: 20rem;
		padding-left: var(--c-sidebar-container);
	}
</style>
