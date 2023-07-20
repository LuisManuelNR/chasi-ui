<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import CLabel from './CLabel.svelte'

	interface $$Props extends HTMLInputAttributes {
		label?: string
		loading?: boolean
	}

	export let label = ''
	export let loading = false
	export let value = ''
</script>

<CLabel {label} {loading} disabled={$$restProps.disabled}>
	<slot name="prepend" slot="prepend" />
	<input class="input-ctrl" bind:value {...$$restProps} />
	<slot name="append" slot="append" />
</CLabel>

<!-- <style lang="scss">
	.icon {
		grid-area: I;
		display: flex;
	}
</style> -->
