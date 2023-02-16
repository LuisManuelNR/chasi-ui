<script lang="ts">
	import Buttons from './sections/Buttons.svelte'
	import Forms from './sections/Forms.svelte'
</script>

<div class="content grid-area gap-4 py-5">
	<Buttons />
	<Forms />
</div>

<style lang="scss">
	.content {
		max-width: 1000px;
		margin: 0 auto;
		padding-bottom: 20rem;
	}
</style>
