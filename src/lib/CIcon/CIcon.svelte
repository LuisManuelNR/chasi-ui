<script lang="ts">
	type Props = {
		icon: string
		class?: string
	}

	const props: Props = $props()
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" class={props.class}>
	<path d={props.icon} />
</svg>

<style>
	svg {
		display: inline-block;
		vertical-align: middle;
		fill: currentColor;
		width: 1em;
		height: 1em;
	}
</style>
