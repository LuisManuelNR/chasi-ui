<script lang="ts">
	// import { CDraggableList } from '$lib'
	// import type { Familiy } from './type.js'

	// export let family: Familiy[] = []

	// function handleChange(e: any) {
	// 	console.log(e.detail)
	// }
</script>

<!-- <CDraggableList
	bind:list={family}
	group="family"
	on:addItem={handleChange}
	on:removeItem={handleChange}
>
	{#each family as member (member.nombre)}
		<div class="draggable">
			<div class="d-flex align-center gap-2 handler s-2 pa-2 mb-2">
				<p>{member.nombre}</p>
			</div>
			<div class="ml-4">
				<svelte:self bind:family={member.hijos} />
			</div>
		</div>
	{/each}
</CDraggableList> -->
