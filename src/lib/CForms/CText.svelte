<script lang="ts">
	import CLabel from './CLabel.svelte'
	import type { Props } from './index.js'

	let {
		label,
		rules,
		loading,
		value = $bindable(''),
		children,
		class: klass,
		...rest
	}: Props = $props()
</script>

<CLabel text={label} {rules} {loading} class={klass}>
	<input class="content" bind:value {...rest} />
	{@render children?.()}
</CLabel>
