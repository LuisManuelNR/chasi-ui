<script lang="ts">
	import { slide } from 'svelte/transition'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiPlus } from '@mdi/js'

	export let active = false
	export let icon = mdiPlus
	/**
	 * Rotación del icono en el botón.
	 * @default '-45deg'
	 */
	export let iconRotation = '-45deg'
	let klass = ''
	export { klass as class }

	function toggle(e?: MouseEvent) {
		if (e) e.stopPropagation()
		active = !active
	}
</script>

<div class="c-expand">
	<button class="btn pa-2 ghost {klass}" class:active on:click|stopPropagation={toggle}>
		<slot name="title">Panel header</slot>
		<div class="action-icon ml-auto" style:--icon-rotation={iconRotation}>
			<CIcon {icon} />
		</div>
	</button>
	{#if active}
		<div transition:slide|local={{ duration: 200 }}>
			<slot {active} />
		</div>
	{/if}
</div>

<style lang="scss">
	button {
		width: 100%;
		transition: 0.2s ease;
	}
	.action-icon {
		rotate: 0deg;
		transition: rotate 200ms ease;
	}
	.active {
		padding-block: 1rem;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		.action-icon {
			rotate: var(--icon-rotation, -45deg);
		}
	}
</style>
