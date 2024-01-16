<script lang="ts">
	import { CLabel, CForm, CSelect, CNotifier } from '$lib'
	import { mdiFlag } from '@mdi/js'
	import type { Rule } from '$lib'

	function handleSubmit() {
		CNotifier.info({ title: 'Form submit' })
	}

	const requiredCountry = (v: any) => {
		console.log(v)
		return !!v || 'Este campo es obligatorio'
	}
	const required = (v: any) => !!v || 'Este campo es requerido y es un error muy largo'
	const validEmail = (v: string) =>
		v.endsWith('@gmail.com') ||
		'Email mal formado, (tiene que terminar con @gmail.com) o algo por el estilo'

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

	const testForm = {}
	function sleep(ms = 1000) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}
	function handleSelectChange(e: CustomEvent) {
		CNotifier.info({ title: JSON.stringify(e.detail, null, 2) })
	}

	let countryDefault: (typeof items)[number]
	let testEmail: string = ''
	let fakeCountry = false
	function changeCountry() {
		if (fakeCountry) {
			countryDefault = { state: 'Cuba', abbr: 'Cu' }
		} else {
			countryDefault = { state: 'Georgia', abbr: 'GA' }
		}
		fakeCountry = !fakeCountry
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
	let testAbbr: any
</script>

<div class="card mb-4">
	<CForm on:submit={handleSubmit}>
		<div class="d-grid gap-3">
			<!-- <CSelect
				label="País"
				{items}
				placeholder="Selecciona algo plis"
				bind:value={countryDefault}
				let:item
				filterBy="state"
				on:select-item={handleSelectChange}
			>
				<button class="btn" slot="input-ctrl" let:open on:click={open}
					>Slot de select como button</button
				>
				{item.state}
			</CSelect> -->
			{#if visibleCountry}
				<CSelect
					label="País"
					{items}
					filterBy="state"
					rules={[requiredCountry]}
					bind:value={countryDefault}
					placeholder="Selecciona algo plis"
					let:item
				>
					{item.state}
				</CSelect>
				<p>selected country: {JSON.stringify(countryDefault, null, 2)}</p>
			{:else}
				country field was hidden
			{/if}
			<div class="d-flex gap-2 align-center mb-4">
				<CLabel label="Email" rules={[required, validEmail]}>
					<input type="email" autocomplete="email" bind:value={testEmail} />
				</CLabel>
				<CLabel label="Password" rules={[required]}>
					<input type="password" autocomplete="current-password" />
				</CLabel>
				<button class="btn"> submit </button>
			</div>
			<div>
				<button class="btn" type="submit"> submit </button>
				<button class="btn" on:click={changeCountry}> set pais from outside </button>
				<button class="btn" on:click={changeemail}> set email from outside </button>
				<button class="btn" on:click={toggleCountryVisibility}> hide/show country </button>
			</div>
		</div>
	</CForm>
</div>
