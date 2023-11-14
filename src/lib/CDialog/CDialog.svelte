<script lang="ts">
	import { BROWSER } from 'esm-env'
	import { tick } from 'svelte'

	export let active = false
	export let persistent = false

	let dialogElement: HTMLDialogElement

	function open() {
		active = true
	}
	function close() {
		active = false
	}

	function handleClick(e: Event) {
		if (!persistent && e.target === dialogElement) {
			close()
		}
	}
	function handlekeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault()
			if (!persistent) active = false
		}
	}

	let dirty = false
	async function observeActivity(show: boolean) {
		if (show) {
			await tick()
			dialogElement.showModal()
			dirty = true
		} else if (dirty && dialogElement) {
			dialogElement.close()
		}
	}

	$: BROWSER && observeActivity(active)
</script>

<slot name="action" {close} {open} />

{#if active}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<dialog class="card" bind:this={dialogElement} on:click={handleClick} on:keydown={handlekeydown}>
		<slot {close} {open} />
	</dialog>
{/if}

<style lang="scss">
	@layer ChasiDialog {
		dialog {
			max-width: var(--dialog-max-width, 70ch);
			width: auto;
			margin: auto;
			animation: scale 0.1s ease;
			box-shadow: var(--shadow-3);
			&::backdrop {
				background-color: #0000006e;
				animation: fade 0.2s ease;
			}
		}
	}
</style>
