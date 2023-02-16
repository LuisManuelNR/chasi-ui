<script lang="ts">
	import Section from './Section.svelte'
	import { CInput, CSelect, CForm } from '$lib'

	let items = [
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

	const required = (v: string) =>
		v === undefined || v === null || v === '' ? 'Este campo es requerido' : false
	const requiredEmail = (v: string) =>
		/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) ? false : 'El email debe ser válido'

	function onSubmit() {
		alert('Success submit!!!')
	}

	let name = 'Predefinido'
</script>

<Section title="Forms">
	<CInput />
	<CInput label="Nombre" />
	<CInput label="Nombre" placeholder="rapamparampa" />
	<CInput label="Loading" loading />
	<CInput label="disabled" disabled value="poapdoapwd" />

	<CInput label="date" type="date" />
	<CInput label="email" type="email" />
	<CInput label="number" type="number" />
	<CInput label="password" type="password" />
	<CInput label="tel" type="tel" />

	<CSelect label="Select Country" {items} itemText="state" itemValue="state" filter />
	<CSelect label="Select Country" {items} itemText="state" itemValue="state" filter disabled />

	<p>Inside a form</p>
	<CForm on:submit={onSubmit}>
		<CInput label="Nombre" bind:value={name} />
		<CInput
			label="email"
			type="email"
			placeholder="alguien@gmail.com"
			rules={[required, requiredEmail]}
		/>
		<CInput label="password" type="password" rules={[required]} />
		<CSelect
			label="Select Country"
			{items}
			itemText="state"
			itemValue="state"
			filter
			rules={[required]}
		/>
		<button type="submit"> submit </button>
		<button type="reset"> reset!! </button>
	</CForm>
</Section>
