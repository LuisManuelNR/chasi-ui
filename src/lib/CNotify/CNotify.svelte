<script lang="ts">
	import { slide } from 'svelte/transition'
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiClose } from '@mdi/js'

	type Props = {
		title?: string
		text?: string
		html?: string
		class?: string
		dissmiss?: () => void
	}

	const { dissmiss = () => {}, ...p }: Props = $props()
	const duration = 250
</script>

<div class="c-notify {p.class}" transition:slide={{ duration }}>
	<div class="d-flex align-center px-3 py-1">
		<b>{p.title}</b>
		<button class="btn icon tonal ml-auto" onclick={dissmiss}>
			<CIcon icon={mdiClose}></CIcon>
		</button>
	</div>
	{#if p.text || p.html}
		<div class="px-3 pb-2">
			{p.text}
			{@html p.html}
		</div>
	{/if}
</div>

<style>
	.c-notify {
		width: 100%;
		margin-bottom: 16px;
		border-radius: var(--size-1);
		position: relative;
		overflow: hidden;
	}
	:global(.notifications-holder) {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 0 1rem;
		width: 100%;
		max-width: 400px;
		z-index: 100;
	}
</style>
