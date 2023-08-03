<script lang="ts">
	import { CSidebar, CIcon } from '$lib'
	import { page } from '$app/stores'
	import '$lib/styles/app.scss'
	import '$lib/styles/defaultTheme.scss'
	import { mdiMenu } from '@mdi/js'

	const links = [
		{ text: 'Theme/Classes', url: '/theme' },
		{ text: 'Froms', url: '/forms' },
		{ text: 'Menus', url: '/menus' },
		{ text: 'Draggable', url: '/draggable' },
		{ text: 'Avatar', url: '/avatar' },
		{ text: 'Actions', url: '/actions' }
	]
	let sidebar = false
</script>

<CSidebar bind:active={sidebar} stayOpenOnDesktop>
	{#each links as link}
		<a class="list-item" class:selected={$page.url.pathname === link.url} href={link.url}
			>{link.text}</a
		>
	{/each}
</CSidebar>

<main>
	<button class="btn fab icon" on:click={() => (sidebar = !sidebar)}>
		<CIcon icon={mdiMenu}></CIcon>
	</button>
	<slot />
</main>

<style lang="scss">
	@use '$lib/styles/breakpoints.scss' as breakpoints;
	main {
		padding-left: 275px;
		padding-block: 16px;
		@include breakpoints.md-down {
			padding-left: 0;
		}
	}
</style>
