<script lang="ts">
	let { children = undefined } = $props()
</script>

<div class="d-grid gap-2">
	{@render children?.()}
</div>

<style>
	.d-grid {
		--xs-columns: repeat(4, 1fr);
	}
</style>
