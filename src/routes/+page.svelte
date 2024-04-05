<script lang="ts">
	import { onMount } from 'svelte'

	let loading = false

	onMount(() => {
		setInterval(() => {
			loading = !loading
		}, 2000)
	})
</script>

<h1>@chasi/ui</h1>

<button class="btn brand" class:loading> hello </button>
<button class="btn ghost accent-text" class:loading> hello </button>
