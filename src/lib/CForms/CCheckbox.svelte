<script lang="ts">
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { mdiCheckboxBlankOutline, mdiCheckboxOutline } from '@mdi/js'
	import CLabel from './CLabel.svelte'
	import type { Props } from './index.js'

	let {
		label,
		rules,
		loading,
		checked = $bindable(false),
		group = $bindable([]),
		children,
		class: klass,
		...rest
	}: Props & { group?: any[] } = $props()
</script>

<CLabel {rules} {loading} class={klass}>
	<input type="checkbox" hidden bind:checked bind:group {...rest} />
	<span class="content">
		{#if checked}
			<CIcon icon={mdiCheckboxOutline} class="f-size-3"></CIcon>
		{:else}
			<CIcon icon={mdiCheckboxBlankOutline} class="f-size-3"></CIcon>
		{/if}
		{label}
	</span>
	<span class="append">
		{@render children?.()}
	</span>
</CLabel>
