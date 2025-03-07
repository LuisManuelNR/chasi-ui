<script lang="ts">
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { mdiPlus } from '@mdi/js'
	import type { Snippet } from 'svelte'

	type Props = {
		children?: Snippet
		title?: string | Snippet
		class?: string
		selected?: boolean
		loading?: boolean
		onselect?: (active: boolean) => void
	}
	let {
		selected,
		loading,
		title,
		children,
		onselect = (active) => (selected = active),
		...p
	}: Props = $props()
</script>

<details
	class="full-width {p.class}"
	class:selected
	class:loading-inline={loading}
	class:disabled={loading}
>
	<summary class="btn tonal full-width justify-start" onclick={() => onselect(!selected)}>
		<CIcon icon={mdiPlus} class="marker"></CIcon>
		{#if title}
			{#if typeof title === 'string'}
				{title}
			{:else}
				{@render title()}
			{/if}
		{/if}
	</summary>
	{@render children?.()}
</details>

<style>
	summary {
		transition: padding 200ms ease;
	}
	summary:active {
		scale: 1;
	}
	details[open] summary {
		max-height: auto;
		padding-block: 1.8rem;
	}
	details::details-content {
		padding-inline: 1rem;
		display: block;
		block-size: 0;
		overflow: hidden;
		transition-property: block-size, content-visibility;
		transition-duration: 150ms;
		transition-timing-function: ease;
		transition-behavior: allow-discrete;
	}

	details[open]::details-content {
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
