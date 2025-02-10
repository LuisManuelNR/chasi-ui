<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { ClassValue } from 'svelte/elements'

	type Breakpoints = {
		xs?: string
		sm?: string
		md?: string
		lg?: string
	}
	type Props = {
		area?: Breakpoints
		columns?: Breakpoints
		rows?: Breakpoints
		children?: Snippet
		class?: ClassValue
	}

	const props: Props = $props()
</script>

<div class={['d-grid', props.class]}>
	{@render props.children?.()}
</div>
