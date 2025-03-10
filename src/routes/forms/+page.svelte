<script lang="ts">
	import type { InputRule } from '$lib/CForms/index.js'
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { CForm, CLabel, CNotifier } from '$lib/index.js'
	import { mdiAbacus, mdiMace } from '@mdi/js'
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
			email = `${Math.random()}`
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	})
	const required: InputRule = (input) => !!input.value || 'Falta esto'
	const mayor: InputRule = (input) => {
		console.log(input.valueAsNumber)
		return input.valueAsNumber > 0.5 ? '' : 'No es mayor'
	}
</script>

<CForm onsubmit={handleSubmit}>
	<div class="d-grid gap-3">
		<CLabel text="Nombre" rules={[required]}><input /></CLabel>
		<CLabel text="Apellidos" rules={[required]}><input /></CLabel>
		<CLabel text="Direccion" rules={[required]}><input /></CLabel>
		<CLabel text="Pais" rules={[required]}><input /></CLabel>
		<CLabel text="Código postal" rules={[required]}><input /></CLabel>
		<div class="d-grid gap-2" style="--xs-columns: 1.2fr 1fr;">
			<CLabel text="Provincia" rules={[required]}><input /></CLabel>
			<CLabel text="Ciudad" rules={[required]}><input /></CLabel>
		</div>
		<div class="d-grid gap-2" style="--xs-columns: 0.3fr 1fr;">
			<CLabel rules={[required]}><input placeholder="+34" /></CLabel>
			<CLabel text="Teléfono" rules={[required]}><input /></CLabel>
		</div>
		<button class="btn" type="submit"> submit </button>
	</div>
</CForm>

<CForm onsubmit={handleSubmit}>
	<div class="d-grid gap-3">
		<p>
			Lorem ipsum dolor,
			<CLabel
				rules={[
					(el) =>
						el.value.startsWith('p')
							? 'No puedes empezar por "p", por que me da algo y no lo permito'
							: ''
				]}
			>
				<input />
			</CLabel>
			<button class="btn">bookmark</button>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quae illum dolorum, itaque eos
			deserunt eveniet esse maiores laboriosam nihil qui. Sint minus, quidem quisquam saepe dolores inventore
			veniam amet!
		</p>

		<CLabel text="Email" rules={[mayor]}>
			<CIcon icon={mdiMace}></CIcon>
			<input type="email" name="email" bind:value={email} />
			<button class="btn icon">
				<CIcon icon={mdiAbacus}></CIcon>
			</button>
		</CLabel>
		<hr />
		<CLabel rules={[required]}>
			<input type="checkbox" name="frutas" value="platano" />
			<span>platano</span>
		</CLabel>
		<CLabel rules={[required]}>
			<input type="checkbox" name="frutas" value="mango" />
			mango
		</CLabel>
		<CLabel rules={[required]}>
			<input type="checkbox" name="frutas" value="al2" />
			al2
		</CLabel>
		<hr />
		<CLabel rules={[required]}>
			<input type="radio" name="cantante" value="el b" />
			el b
		</CLabel>
		<CLabel rules={[required]}>
			<input type="radio" name="cantante" value="carlo" />
			carlo
		</CLabel>
		<CLabel rules={[required]}>
			<input type="radio" name="cantante" value="pepe" />
			pepe
		</CLabel>
		<CLabel rules={[required]}>
			<input type="radio" name="cantante" value="juan" />
			juan
		</CLabel>
		<hr />
		<button class="btn" type="submit"> submit </button>
	</div>
</CForm>
