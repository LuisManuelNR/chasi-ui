<script lang="ts">
	import Section from './Section.svelte'
	import { CInput, CSelect, CForm, CToggle } from '$lib'

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

	const required = (v: string | boolean) =>
		v === undefined || v === null || v === '' || v === false ? 'Este campo es requerido' : false
	const requiredEmail = (v: string) =>
		/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) ? false : 'El email debe ser válido'

	function onSubmit() {
		alert('Success submit!!!')
	}

	let name = 'Predefinido'
	let foods = []
	let restaurant = 'Cuban'
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
		<pre>Select some foods: {foods}</pre>
		<div class="d-flex">
			<CToggle label="Fish" bind:group={foods} value="Fish" />
			<CToggle label="Meat" bind:group={foods} value="Meat" />
			<CToggle label="Pizza" rules={[required]} bind:group={foods} value="Pizza" />
			<CToggle label="Salad" bind:group={foods} value="Salad" />
		</div>
		<pre>Select one restaurant: {restaurant}</pre>
		<div class="d-flex">
			<CToggle label="Chinese" type="radio" bind:group={restaurant} value="Chinese" />
			<CToggle label="Italian" type="radio" bind:group={restaurant} value="Italian" />
			<CToggle label="Cuban" type="radio" bind:group={restaurant} value="Cuban" />
			<CToggle label="Indi" type="radio" bind:group={restaurant} value="Indi" />
		</div>
		<CInput label="About you" type="textarea" />
		<CToggle label="Accept terms and conditions" rules={[required]} />
		<button type="submit"> submit </button>
		<button type="reset"> reset!! </button>
	</CForm>
</Section>
