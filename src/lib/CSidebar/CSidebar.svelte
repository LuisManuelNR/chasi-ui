<script lang="ts">
	export let openState = false
	export let right = false

	let dialogElement: HTMLDialogElement
	function open() {
		dialogElement.showModal()
	}
	function close() {
		dialogElement.close()
	}
	function onClick(e: Event) {
		if (e.target === dialogElement) {
			close()
		}
	}
</script>

<dialog
	class="card pa-0"
	class:open-state={openState}
	class:right
	bind:this={dialogElement}
	on:click={onClick}
	on:keydown
>
	<aside>
		<slot name="header" />
		<nav class="nav-body">
			<slot {close} {open} />
		</nav>
		<slot name="footer" />
	</aside>
</dialog>
<slot name="action" />

<style lang="scss">
	@use '../styles/breakpoints.scss' as breakpoints;
	:global(:root) {
		--c-sidebar-container: initial;
		--c-sidebar-width: 270px;
	}
	dialog {
		height: 97%;
		width: 100%;
		max-height: 100%;
		max-width: var(--c-sidebar-width);
		top: 1.5%;
		left: var(--size-2);
		animation: slideToLeft 0.15s ease;
		box-shadow: var(--shadow-3);
		.nav-body {
			height: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		}
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
		}
	}
	.right {
		left: auto;
		right: var(--size-2);
		animation: slideToRight 0.15s ease;
	}
	aside {
		height: 100%;
	}
	:global(dialog.open-state + [slot='action']) {
		z-index: 5;
	}
	@include breakpoints.sm-up {
		:global(dialog.open-state + [slot='action']) {
			z-index: -1;
		}
		:global(:root) {
			--c-sidebar-container: var(--c-sidebar-width);
		}
		.open-state {
			position: fixed;
			display: block;
		}
	}
</style>
