<script lang="ts">
	import CLabel from './CLabel.svelte'

	export let items = []
	export let itemValue: string
	export let itemText: string
</script>

<CLabel>
	<select>
		{#each items as item}
			<option>{itemText ? item[itemText] : item}</option>
		{/each}
	</select>
</CLabel>

<style>
	:global(select *) {
		min-height: 38px;
		background-color: black;
		color: brown;
	}
</style>
