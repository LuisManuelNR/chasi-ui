<script lang="ts">
	import { slide, fade } from 'svelte/transition'
	export let right = false
	export let active = false
	export let hideOverlay: boolean | 'only-mobile' | 'only-desktop' = false
</script>

{#if active}
	<div class="sidebar py-3" transition:slide={{ axis: 'x', duration: 150 }} class:right>
		<aside class="card pa-0">
			<div><slot name="header" /></div>
			<nav class="nav-body">
				<slot />
			</nav>
			<div><slot name="footer" /></div>
		</aside>
	</div>
{/if}
{#if active && (typeof hideOverlay === 'string' || hideOverlay === false)}
	<button
		transition:fade={{ duration: 200 }}
		class="overlay {hideOverlay}"
		on:click={() => (active = false)}
	></button>
{/if}

<style lang="scss">
	@use '../styles/breakpoints.scss' as breakpoints;
	@layer ChasiSidebar {
		.sidebar {
			height: 100%;
			height: 100dvh;
			top: 0;
			width: 100%;
			max-width: var(--c-sidebar-width, 270px);
			left: var(--size-2);
			position: fixed;
			z-index: 6;
			animation: slideToRight 150ms ease;
			&.right {
				left: auto;
				right: var(--size-2);
			}
			.nav-body {
				overflow-x: hidden;
				overflow-y: auto;
			}
			aside {
				height: 100%;
				display: grid;
				grid-template-rows: auto 1fr auto;
				box-shadow: var(--shadow-3);
			}
		}
		.overlay {
			position: fixed;
			inset: 0;
			background-color: #00000096;
			z-index: 5;
			@include breakpoints.md-down {
				&.only-mobile {
					display: none;
				}
			}
			@include breakpoints.md-up {
				&.only-desktop {
					display: none;
				}
			}
		}
	}
</style>
