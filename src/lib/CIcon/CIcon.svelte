<script lang="ts">
	export let icon: string
	export let size = 24
	let klass = ''
	export { klass as class }
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	aria-hidden="true"
	style:--size="{size}px"
	class="c-icon {klass}"
>
	<path d={icon} />
</svg>

<style lang="scss">
	.c-icon {
		display: inline-block;
		vertical-align: bottom;
		fill: currentColor;
		width: var(--size, 24px);
		height: var(--size, 24px);
		min-width: var(--size, 24px);
		min-height: var(--size, 24px);
	}
</style>
