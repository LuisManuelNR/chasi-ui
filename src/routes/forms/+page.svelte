<script lang="ts">
	import { CLabel, CForm, CSelect } from '$lib'
	import { mdiFlag } from '@mdi/js'
	import type { Rule } from '$lib'

	function handleSubmit() {
		console.log('Form submit')
	}

	const required: Rule = (v) => !!v || 'Este campo es requerido'
	const validEmail: Rule = (v: string) =>
		v.endsWith('@gmail.com') || 'Email mal formado, (tiene que terminar con @gmail.com)'

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

	const testForm = {
		pais: 'California'
	}
	function sleep(ms = 1000) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
	async function handleSelectChange(e: CustomEvent) {
		await sleep(3000)
		console.log('Select change', e.detail)
	}

	let countryDefault: (typeof items)[number]
	let testEmail: string = ''
	function changeCountry() {
		countryDefault = { state: 'Florida', abbr: 'FL' }
	}
	function changeemail() {
		if (testEmail === 'no-es-valido') {
			testEmail = 'valido@gmail.com'
		} else {
			testEmail = 'no-es-valido'
		}
	}
	let visibleCountry = true
	function toggleCountryVisibility() {
		visibleCountry = !visibleCountry
	}
	let testAbbr = 'CA'
</script>

<div class="card mb-4">
	<CForm on:submit={handleSubmit}>
		<div class="d-grid gap-3">
			<!-- <CSelect
				label="País"
				{items}
				itemText="state"
				let:open
				let:displayText
				filterBy="state"
				on:change={handleSelectChange}
			>
				<button class="btn" on:click={open}> pais con filtro: resultado {displayText} </button>
			</CSelect> -->
			{#if visibleCountry}
				<CSelect
					label="País"
					{items}
					itemText="state"
					itemValue="abbr"
					filterBy="state"
					rules={[required]}
					bind:value={testAbbr}
				/>
				<p>selected country: {testAbbr}</p>
			{:else}
				country field was hidden
			{/if}
			<CLabel label="Email" let:rules>
				<input
					type="email"
					autocomplete="email"
					use:rules={[required, validEmail]}
					value={testEmail}
				/>
			</CLabel>
			<CLabel label="Password" let:rules>
				<input type="password" autocomplete="current-password" use:rules={[required]} />
			</CLabel>
			<div>
				<button class="btn" type="submit"> submit </button>
				<button class="btn" on:click={changeCountry}> set pais from outside </button>
				<button class="btn" on:click={changeemail}> set email from outside </button>
				<button class="btn" on:click={toggleCountryVisibility}> hide/show country </button>
			</div>
		</div>
	</CForm>
</div>

<div class="card mb-4">
	<CForm on:submit={handleSubmit}>
		<div class="d-grid gap-3">
			<CSelect
				label="Select 2"
				{items}
				bind:value={testForm.pais}
				itemText="state"
				itemValue="state"
				rules={[required]}
			/>
			<button class="btn"> submit </button>
		</div>
	</CForm>
	<pre>{JSON.stringify(testForm, null, 2)}</pre>
</div>

<div class="d-flex gap-4 flex-column card mb-4">
	<CLabel label="Correo">
		<input type="email" />
	</CLabel>
	<CLabel label="checkbox">
		<img
			slot="prepend"
			src="https://imagessl.casadellibro.com/t1e/flag/ES.png"
			alt="banderita"
			width="38px"
		/>
		<input type="checkbox" />
	</CLabel>
	<CLabel label="checkbox">
		<input type="checkbox" />
	</CLabel>
	<CLabel label="checkbox">
		<input type="checkbox" />
	</CLabel>
	<CLabel label="checkbox">
		<input type="checkbox" />
	</CLabel>
	<CLabel label="color">
		<input type="color" />
	</CLabel>
	<CLabel label="date">
		<input type="date" />
	</CLabel>
	<CLabel label="datetime-local">
		<input type="datetime-local" />
	</CLabel>
	<CLabel label="month">
		<input type="month" />
	</CLabel>
	<CLabel label="number">
		<input type="number" />
	</CLabel>
	<CLabel label="radio">
		<input type="radio" />
	</CLabel>
	<CLabel label="radio">
		<input type="radio" />
	</CLabel>
	<CLabel label="radio">
		<input type="radio" />
	</CLabel>
	<CLabel label="range">
		<input type="range" />
	</CLabel>
	<CLabel label="time">
		<input type="time" />
	</CLabel>
	<CLabel label="url">
		<input type="url" />
	</CLabel>
	<CLabel label="week">
		<input type="week" />
	</CLabel>
</div>
