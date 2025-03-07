<script lang="ts">
	import '$lib/styles/main.scss'
	import { page } from '$app/state'
	import { CIcon, CSidebar } from '$lib/index.js'
	import { mdiMenu } from '@mdi/js'

	let { children } = $props()

	let sidebar = $state(false)

	const links = ['dialog', 'expand', 'menu', 'forms']
</script>

<button
	class="btn icon fab bottom hidden-sm hidden-md hidden-lg"
	onclick={() => (sidebar = !sidebar)}
>
	<CIcon icon={mdiMenu}></CIcon>
</button>

<CSidebar bind:active={sidebar} class="bg layout-sidebar">
	<p class="pa-2 f-w-6">Components</p>
	<hr class="s-2" />
	<div class="pa-2">
		{#each links as link}
			<a
				href="/{link}"
				class="list-item rows full-width"
				class:selected={`/${link}` === page.url.pathname}>{link}</a
			>
		{/each}
	</div>
</CSidebar>

<main>
	<div class="px-4">
		{@render children?.()}
	</div>
</main>

<style lang="scss">
	@use '$lib/styles/container.scss' as container;

	main {
		--width: 250px;
		padding: 5rem;
		padding-left: var(--width);
		min-height: 100dvh;
	}
	.list-item {
		text-transform: capitalize;
	}

	@include container.sm-down {
		main {
			padding-left: 0;
		}
	}
	@include container.sm-up {
		:global {
			.layout-sidebar {
				display: block !important;
				transform: translateX(0) !important;
				&::backdrop {
					display: none !important;
				}
			}
		}
	}
</style>
