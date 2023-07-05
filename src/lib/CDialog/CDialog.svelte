<script lang="ts">
	let dialogElement: HTMLDialogElement
	export function open() {
		dialogElement.showModal()
	}
	export function close() {
		dialogElement.close()
	}
</script>

<slot name="action">
	<button class="btn" on:click={open}> open dialog </button>
</slot>

<dialog class="card" bind:this={dialogElement}>
	<slot {close} {open} />
</dialog>

<style lang="scss">
	:where(dialog) {
		max-width: var(--dialog-max-width, 70ch);
		width: auto;
		margin: auto;
		animation: scale 0.1s ease;
		box-shadow: var(--shadow-3);
		&::backdrop {
			background-color: #0000006e;
			animation: fade 0.2s ease;
			pointer-events: none;
		}
	}
</style>
