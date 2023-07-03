<script lang="ts">
	import Section from './Section.svelte'
	import { CInput, CSelect, CForm, CNotifier, CIcon, CToggle } from '$lib'
	import type { Rule } from '$lib'
	import { mdiFaceMan } from '@mdi/js'

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
	const requiredCheck: Rule = ({ checked }) => checked || 'Este campo es requerido'
	const requiredInput: Rule = ({ value }) => !!value || 'Este campo es requerido'
	const requiredEmail: Rule = ({ value }) =>
		(value && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) ||
		'El email debe ser válido'

	const formDataDemo: Record<string, any> = {
		restaurant: 'Cuban'
	}

	async function onSubmit() {
		CNotifier.success({
			title: 'Check console to see form data!!',
			text: 'With this we can test notifications too'
		})
		console.log(formDataDemo)
	}

	function changeExternally() {
		formDataDemo.name = 'name Changed'
		formDataDemo.country = 'Florida'
		formDataDemo.food = ['Fish', 'Pizza']
		formDataDemo.acceptTerms = true
	}

	const test: Record<string, any> = {}
</script>

<Section title="Forms">
	<CInput label="Loading" loading />
	<CInput label="disabled" value="poapdoapwd" disabled />

	<CInput label="Nombre" placeholder="rapamparampa" bind:value={test.nombre} />
	<CInput label="Number" type="number" bind:value={test.number} />

	<CSelect label="Slot select" let:toggle {items} itemText="state" filter>
		<button class="btn" on:click={toggle}> a select </button>
	</CSelect>

	<pre>{JSON.stringify(test, null, 2)}</pre>

	<CInput label="Date" type="date" />
	<CInput label="Tel" type="tel" />
	<CInput label="Email" type="email" />
	<CInput label="Password" type="password" />

	<CSelect label="Select Country" {items} itemText="state" itemValue="state" filter />
	<CSelect label="Select Country" {items} itemText="state" itemValue="state" filter disabled />

	<p class="text-h4">Inside a form</p>
	<CForm on:submit={onSubmit}>
		<div class="d-grid gap-4">
			<CInput bind:value={formDataDemo.name} />
			<CInput label="Nombre" rules={[requiredInput]} bind:value={formDataDemo.name} />
			<CInput
				label="Email"
				type="email"
				rules={[requiredInput, requiredEmail]}
				bind:value={formDataDemo.email}
			/>
			<CInput
				label="Password"
				type="password"
				rules={[requiredInput]}
				bind:value={formDataDemo.password}
			/>
			<CSelect
				label="Select Country"
				{items}
				itemText="state"
				itemValue="state"
				filter
				rules={[requiredInput]}
				bind:value={formDataDemo.country}
			/>
			<pre>Select some foods: {formDataDemo.food}</pre>
			<div class="d-flex flex-wrap">
				<CToggle label="Fish" bind:group={formDataDemo.food} value="Fish" />
				<CToggle label="Meat" bind:group={formDataDemo.food} value="Meat" />
				<CToggle
					label="Pizza"
					rules={[requiredCheck]}
					bind:group={formDataDemo.food}
					value="Pizza"
				/>
				<CToggle label="Salad" disabled bind:group={formDataDemo.food} value="Salad" />
			</div>
			<pre>Select one restaurant: {formDataDemo.restaurant}</pre>
			<div class="d-flex flex-wrap">
				<CToggle
					label="Chinese"
					type="radio"
					bind:group={formDataDemo.restaurant}
					value="Chinese"
				/>
				<CToggle label="Italian" type="radio" bind:group={formDataDemo.restaurant} value="Italian">
					<img
						slot="prepend"
						src="https://imagessl.casadellibro.com/t1e/flag/IT.png"
						alt="Italian"
						width="38px"
					/>
				</CToggle>
				<CToggle label="Cuban" type="radio" bind:group={formDataDemo.restaurant} value="Cuban">
					<svelte:fragment slot="prepend">
						<CIcon icon={mdiFaceMan} />
					</svelte:fragment>
				</CToggle>
				<CToggle label="Indi" type="radio" bind:group={formDataDemo.restaurant} value="Indi">
					<svelte:fragment slot="append">
						<CIcon icon={mdiFaceMan} />
					</svelte:fragment>
				</CToggle>
				<CToggle
					label="American"
					disabled
					type="radio"
					bind:group={formDataDemo.restaurant}
					value="American"
				/>
			</div>
			<!-- <CLabel label="About you" rules={[requiredInput]}>
			<textarea rows="5" bind:value={formDataDemo.about} />
		</CLabel> -->
			<CToggle
				label="Accept terms and conditions"
				bind:checked={formDataDemo.acceptTerms}
				rules={[requiredCheck]}
			/>
			<button class="btn" type="submit"> submit </button>
			<button class="btn" on:click={changeExternally}> modify form externally </button>
			<pre>{JSON.stringify(formDataDemo, null, 2)}</pre>
		</div>
	</CForm>

	<p>Inline inputs</p>
	<div class="d-flex align-center gap-2 flex-wrap">
		<button class="btn"> hello </button>
		<CInput bind:value={formDataDemo.name} class="mb-0" />
		<CInput bind:value={formDataDemo.email} />
	</div>
</Section>

<style>
	pre {
		white-space: pre-wrap;
	}
</style>
