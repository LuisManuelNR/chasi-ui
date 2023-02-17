<script lang="ts">
	import Section from './Section.svelte'
	import { CInput, CSelect, CForm, CToggle, CNotifier } from '$lib'

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

	const formDataDemo: Record<string, any> = {}

	function onSubmit() {
		CNotifier.success({
			title: 'Check console to see form data!!',
			text: 'With this we can test notifications too'
		})
		console.log(formDataDemo)
	}
</script>

<Section title="Forms">
	<CInput />
	<CInput label="Nombre" />
	<CInput label="Nombre" placeholder="rapamparampa" />
	<CInput label="Loading" loading />
	<CInput label="disabled" disabled value="poapdoapwd" />

	<CInput label="number" type="number" />
	<CInput label="date" type="date" />
	<CInput label="tel" type="tel" />
	<CInput label="email" type="email" />
	<CInput label="password" type="password" />

	<CSelect label="Select Country" {items} itemText="state" itemValue="state" filter />
	<CSelect label="Select Country" {items} itemText="state" itemValue="state" filter disabled />

	<p>Inside a form</p>
	<CForm on:submit={onSubmit}>
		<CInput label="Nombre" bind:value={formDataDemo.name} rules={[required]} />
		<CInput
			label="email"
			type="email"
			placeholder="alguien@gmail.com"
			rules={[required, requiredEmail]}
			bind:value={formDataDemo.email}
		/>
		<CInput
			label="password"
			type="password"
			rules={[required]}
			bind:value={formDataDemo.password}
		/>
		<CSelect
			label="Select Country"
			{items}
			itemText="state"
			itemValue="state"
			filter
			rules={[required]}
			bind:value={formDataDemo.country}
		/>
		<pre>Select some foods: {formDataDemo.food}</pre>
		<div class="d-flex flex-wrap">
			<CToggle label="Fish" bind:group={formDataDemo.food} value="Fish" />
			<CToggle label="Meat" bind:group={formDataDemo.food} value="Meat" />
			<CToggle
				label="Pizza"
				rules={[required]}
				bind:group={formDataDemo.food}
				checked
				value="Pizza"
			/>
			<CToggle label="Salad" disabled bind:group={formDataDemo.food} value="Salad" />
		</div>
		<pre>Select one restaurant: {formDataDemo.restaurant}</pre>
		<div class="d-flex flex-wrap">
			<CToggle label="Chinese" type="radio" bind:group={formDataDemo.restaurant} value="Chinese" />
			<CToggle label="Italian" type="radio" bind:group={formDataDemo.restaurant} value="Italian" />
			<CToggle label="Cuban" type="radio" bind:group={formDataDemo.restaurant} value="Cuban" />
			<CToggle label="Indi" type="radio" bind:group={formDataDemo.restaurant} value="Indi" />
			<CToggle
				label="American"
				disabled
				type="radio"
				bind:group={formDataDemo.restaurant}
				value="American"
			/>
		</div>
		<CInput label="About you" type="textarea" bind:value={formDataDemo.about} />
		<CToggle
			label="Accept terms and conditions"
			rules={[required]}
			bind:checked={formDataDemo.acceptTerms}
		/>
		<button type="submit"> submit </button>
		<button type="reset"> reset!! </button>
	</CForm>
</Section>

<style>
	pre {
		white-space: pre-wrap;
	}
</style>
