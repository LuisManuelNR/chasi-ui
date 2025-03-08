<script lang="ts">
	import type { InputRule } from '$lib/CForms/types.js'
	import { CForm, CInput, CNotifier } from '$lib/index.js'
	import { onMount } from 'svelte'

	function handleSubmit(e: SubmitEvent) {
		// const t = e.target as HTMLFormElement
		// const inputs: Record<string, string> = {}
		// const iterator = Object.entries(t.elements)
		// // console.log(iterator)
		// for (const [name, input] of iterator) {
		// 	if (Number.isNaN(Number.parseInt(name))) {
		// 		inputs[name] = input.value
		// 	}
		// }
		CNotifier.info('Form submited!!')
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
	const required: InputRule = (input) => !!input.value || 'Falta esto'
</script>

<CForm onsubmit={handleSubmit}>
	<div class="d-grid gap-3">
		<CInput label="Nombre" rules={[required]} />
		<CInput label="Apellidos" rules={[required]} />
		<CInput label="Direccion" rules={[required]} />
		<CInput label="Pais" rules={[required]} />
		<CInput label="Código postal" rules={[required]} />
		<div class="d-grid gap-2" style="--xs-columns: 1.2fr 1fr;">
			<CInput label="Provincia" rules={[required]} />
			<CInput label="Ciudad" rules={[required]} />
		</div>
		<div class="d-grid gap-2" style="--xs-columns: 0.3fr 1fr;">
			<CInput placeholder="+34" rules={[required]} />
			<CInput label="Teléfono" rules={[required]} />
		</div>
		<button class="btn" type="submit"> submit </button>
	</div>
</CForm>

<CForm onsubmit={handleSubmit}>
	<div class="d-grid gap-3">
		<p>
			Lorem ipsum dolor,
			<CInput
				type="text"
				name="name"
				placeholder="nombre"
				rules={[
					(el) =>
						el.value.startsWith('p')
							? 'No puedes empezar por "p", por que me da algo y no lo permito'
							: ''
				]}
			/>
			<button class="btn">bookmark</button>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quae illum dolorum, itaque eos
			deserunt eveniet esse maiores laboriosam nihil qui. Sint minus, quidem quisquam saepe dolores inventore
			veniam amet!
		</p>
		<CInput label="Email" type="text" name="email" bind:value={email} />
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
	</div>
</CForm>
