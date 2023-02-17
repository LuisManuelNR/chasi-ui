<script lang="ts">
	export let title: string
</script>

<section class="card d-grid gap-3" id={title}>
	<p class="text-h4">{title}</p>
	<slot />
</section>
