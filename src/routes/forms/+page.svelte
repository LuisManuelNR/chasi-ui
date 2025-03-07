<script lang="ts">
	import { CForm, CInput } from '$lib/index.js'
	import { onMount } from 'svelte'

	function handleSubmit(e: SubmitEvent) {
		const t = e.target as HTMLFormElement
		const inputs: Record<string, string> = {}
		const iterator = Object.entries(t.elements)
		// console.log(iterator)
		for (const [name, input] of iterator) {
			if (Number.isNaN(Number.parseInt(name))) {
				inputs[name] = input.value
			}
		}
		console.log(inputs)
	}

	let email = $state('')
	onMount(() => {
		const interval = setInterval(() => {
			email = 'eee' + Math.random()
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	})
</script>

<CForm onsubmit={handleSubmit}>
	<CInput
		type="text"
		name="name"
		rules={[(el) => (el.value.startsWith('p') ? 'No puedes empezar por p' : '')]}
	/>
	<CInput type="text" name="email" bind:value={email} />
	<hr />
	<CInput type="checkbox" name="frutas" value="platano" />
	<CInput type="checkbox" name="frutas" value="mango" />
	<CInput type="checkbox" name="frutas" value="al2" />
	<CInput type="checkbox" name="frutas" value="coco" />
	<hr />
	<CInput type="radio" name="cantante" value="el b" />
	<CInput type="radio" name="cantante" value="carlo" />
	<CInput type="radio" name="cantante" value="pepe" />
	<CInput type="radio" name="cantante" value="juan" />
	<hr />
	<button class="btn" type="submit"> submit </button>
</CForm>
