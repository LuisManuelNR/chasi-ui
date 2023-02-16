<script lang="ts">
	export let title: string
</script>

<section class="card d-grid gap-3">
	<p class="text-h4">{title}</p>
	<slot />
</section>
