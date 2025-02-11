<script lang="ts">
	import CSidebar from '$lib/CSidebar/CSidebar.svelte'
	import '$lib/styles/main.scss'

	let { children } = $props()
</script>

<CSidebar>
	<a href="/" class="list-item row">icons</a>
</CSidebar>
{@render children?.()}
