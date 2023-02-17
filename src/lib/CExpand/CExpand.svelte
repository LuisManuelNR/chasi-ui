<script lang="ts">
	import { slide } from 'svelte/transition'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiPlus } from '@mdi/js'

	export let active = false
	let klass = ''
	export { klass as class }
</script>

<div class="c-expand">
	<button
		class="d-flex align-center pa-2 gap-2 {klass}"
		class:active
		on:click={() => (active = !active)}
	>
		<slot name="header">Panel header</slot>
		<div class="action-icon ml-auto">
			<slot name="icon">
				<CIcon icon={mdiPlus} />
			</slot>
		</div>
	</button>
	{#if active}
		<div in:slide={{ duration: 180 }} out:slide={{ duration: 180 }}>
			<slot />
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
		transition: rotate 0.5s ease;
	}
	.active {
		padding: 24px 1rem;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		.action-icon {
			rotate: -45deg;
		}
	}
</style>
