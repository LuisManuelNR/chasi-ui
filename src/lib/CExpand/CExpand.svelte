<script lang="ts">
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { mdiPlus } from '@mdi/js'
	import type { Snippet } from 'svelte'

	type Props = {
		children?: Snippet
		title?: string
		class?: string
	}
	let p: Props = $props()
</script>

<details class="full-width {p.class}">
	<summary class="btn tonal full-width justify-start">
		<CIcon icon={mdiPlus} class="marker f-size-4"></CIcon>
		{p.title}
	</summary>
	{@render p.children?.()}
</details>

<style>
	summary {
		transition: padding 200ms ease;
	}
	details[open] summary {
		max-height: auto;
		padding-block: 1.8rem;
	}
	details::details-content {
		display: block;
		block-size: 0;
		overflow: hidden;
		transition-property: block-size, content-visibility;
		transition-duration: 150ms;
		transition-timing-function: ease;
		transition-behavior: allow-discrete;
	}

	details[open]::details-content {
		padding: 1rem;
		block-size: auto;
		block-size: calc-size(auto, size);
	}

	:global {
		details .marker {
			rotate: 0deg;
			transition: rotate 200ms ease;
		}

		details[open] .marker {
			rotate: -45deg;
		}
	}
</style>
