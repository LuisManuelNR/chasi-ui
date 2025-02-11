<script lang="ts">
	let { value = $bindable(), ...props } = $props()
</script>

<input bind:value {...props} />

<style>
	input {
		font-family: 'Comic Sans MS';
		color: deeppink;
	}
</style>
