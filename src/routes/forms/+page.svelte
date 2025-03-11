<script lang="ts">
	import CCheckbox from '$lib/CForms/CCheckbox.svelte'
	import CSelect from '$lib/CForms/CSelect.svelte'
	import type { InputRule } from '$lib/CForms/index.js'
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { CForm, CText, CNotifier } from '$lib/index.js'
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
	const required: InputRule = (input) => !!input.value || !!input.checked || 'Falta esto'
	const mayor: InputRule = (input) => {
		console.log(input.valueAsNumber)
		return input.valueAsNumber > 0.5 ? '' : 'No es mayor'
	}

	const countries = [
		{ state: 'Florida', abbr: 'FL' },
		{ state: 'Georgia', abbr: 'GA' },
		{ state: 'Nebraska', abbr: 'NE' },
		{ state: 'California', abbr: 'CA' },
		{ state: 'New York', abbr: 'NY' },
		{ state: 'Florida', abbr: 'FL' },
		{ state: 'Georgia', abbr: 'GA' },
		{ state: 'Nebraska', abbr: 'NE' },
		{ state: 'California', abbr: 'CA' },
		{ state: 'New York', abbr: 'NY' },
		{ state: 'Florida', abbr: 'FL' },
		{ state: 'Georgia', abbr: 'GA' },
		{ state: 'Nebraska', abbr: 'NE' },
		{ state: 'California', abbr: 'CA' },
		{ state: 'New York', abbr: 'NY' },
		{ state: 'Florida', abbr: 'FL' },
		{ state: 'Georgia', abbr: 'GA' },
		{ state: 'Nebraska', abbr: 'NE' },
		{ state: 'California', abbr: 'CA' },
		{ state: 'New York', abbr: 'NY' },
		{ state: 'Florida', abbr: 'FL' },
		{ state: 'Georgia', abbr: 'GA' },
		{ state: 'Nebraska', abbr: 'NE' },
		{ state: 'California', abbr: 'CA' },
		{ state: 'New York', abbr: 'NY' },
		{ state: 'Florida', abbr: 'FL' },
		{ state: 'Georgia', abbr: 'GA' },
		{ state: 'Nebraska', abbr: 'NE' },
		{ state: 'California', abbr: 'CA' },
		{ state: 'New York', abbr: 'NY' }
	]
	let selectedCountry: (typeof countries)[number] | undefined = $state.raw()

	let selecciongroup = $state([])
</script>

<CForm onsubmit={handleSubmit}>
	<div class="d-grid gap-3">
		<CText label="Nombre" rules={[required]}></CText>
		<CText label="Apellidos" rules={[required]}></CText>
		<CText label="Direccion" rules={[required]}></CText>
		<div class="d-grid gap-2" style="--xs-columns: 1.5fr 0.5fr;">
			<CSelect
				label="Pais"
				bind:value={selectedCountry}
				items={countries}
				rules={[required]}
				filterBy="state"
			>
				{selectedCountry ? selectedCountry.state : '-'}
				{#snippet options(item)}
					{item.state}
				{/snippet}
			</CSelect>
			<CText label="Código postal" rules={[required]}></CText>
		</div>
		<div class="d-grid gap-2" style="--xs-columns: 1.2fr 1fr;">
			<CText label="Provincia" rules={[required]}></CText>
			<CText label="Ciudad" rules={[required]}></CText>
		</div>
		<div class="d-grid gap-2" style="--xs-columns: 0.3fr 1fr;">
			<CText placeholder="+34" rules={[required]}></CText>
			<CText label="Teléfono" type="tel" rules={[required]}></CText>
		</div>
		<button class="btn" type="submit"> submit </button>
	</div>
</CForm>

<CForm onsubmit={handleSubmit}>
	<div class="d-grid gap-3">
		<p>
			Lorem ipsum dolor,
			<CText
				rules={[
					(el) =>
						el.value.startsWith('p')
							? 'No puedes empezar por "p", por que me da algo y no lo permito'
							: ''
				]}
			></CText>
			<button class="btn">bookmark</button>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quae illum dolorum, itaque eos
			deserunt eveniet esse maiores laboriosam nihil qui. Sint minus, quidem quisquam saepe dolores inventore
			veniam amet!
		</p>

		<CText label="Email" type="email" rules={[mayor]} bind:value={email}>
			<CIcon class="preppend" icon={mdiMace}></CIcon>
			<button class="btn icon append">
				<CIcon icon={mdiAbacus}></CIcon>
			</button>
		</CText>
		<hr />
		<CCheckbox>
			<p class="f-size-0">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, incidunt a est dolor
				ducimus asperiores. <a href="/">Lorem ipsum dolor sit amet.</a> Lorem ipsum dolor sit amet consectetur,
				adipisicing elit. Laborum iste asperiores earum!
			</p>
		</CCheckbox>

		<!-- <CCheckbox label="mango" name="frutas" value="mango" bind:group={selecciongroup}></CCheckbox>
		<CCheckbox label="platano" name="frutas" value="platano" bind:group={selecciongroup}
		></CCheckbox>
		<CCheckbox label="manzana" name="frutas" value="manzana" bind:group={selecciongroup}
		></CCheckbox>
		<CCheckbox label="oregano" name="frutas" value="oregano" bind:group={selecciongroup}
		></CCheckbox> -->

		<input type="checkbox" name="frutas" value="mango" bind:group={selecciongroup} />
		<input type="checkbox" name="frutas" value="platano" bind:group={selecciongroup} />
		<input type="checkbox" name="frutas" value="manzana" bind:group={selecciongroup} />
		<input type="checkbox" name="frutas" value="oregano" bind:group={selecciongroup} />
		<pre>{JSON.stringify(selecciongroup, null, 2)}</pre>
		<!-- <CText rules={[required]}>
			<input type="checkbox" name="frutas" value="platano" />
			<p class="f-size-0">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, incidunt a est dolor
				ducimus asperiores. <a href="/">Lorem ipsum dolor sit amet.</a> Lorem ipsum dolor sit amet consectetur,
				adipisicing elit. Laborum iste asperiores earum!
			</p>
		</CText>
		<CLabel rules={[required]}>
			<input type="checkbox" name="frutas" value="mango" />
			<p>mango</p>
		</CLabel>
		<CLabel rules={[required]}>
			<input type="checkbox" name="frutas" value="mango" />
			mango
		</CLabel>
		<CLabel text="mango" rules={[required]}>
			<input type="checkbox" name="frutas" value="al2" />
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
		</CLabel> -->
		<hr />
		<button class="btn" type="submit"> submit </button>
	</div>
</CForm>
