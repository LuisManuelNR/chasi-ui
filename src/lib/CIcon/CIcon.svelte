<script lang="ts">
	export let icon: string
	export let size = 24
	let klass = ''
	export { klass as class }
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {size} {size}"
	aria-hidden="true"
	style:width="{size}px"
	style:height="{size}px"
	class="c-icon {klass}"
>
	<path d={icon} />
</svg>

<style lang="scss">
	.c-icon {
		fill: currentColor;
	}
</style>
