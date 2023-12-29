<script lang="ts">
	import { CNotifier, CForm, CSelect, CLabel } from '$lib'

	type Photo = {
		albumId: number
		id: number
		title: string
		url: string
		thumbnailUrl: string
	}
	let photos: Photo[] = []
	let loading = false

	async function loadData() {
		loading = true
		const url = 'https://jsonplaceholder.typicode.com/photos?_limit=40'
		const response = await fetch(url)
		photos = await response.json()
		loading = false
	}

	let disabled = false
	let selectVisible = true
	let selectValue: Photo = {
		albumId: 1,
		id: 18,
		title: 'laboriosam odit nam necessitatibus et illum dolores reiciendis',
		url: 'https://via.placeholder.com/600/1fe46f',
		thumbnailUrl: 'https://via.placeholder.com/150/1fe46f'
	}
	let pototo = 0

	function onSubmit() {
		CNotifier.success({ title: 'Form submited' })
	}

	let inputValue = ''

	function required(v: any) {
		return !!v || 'Este campo es requerido y es un error muy largo'
	}
	function validateSelect(value: Photo) {
		return value.url.endsWith('96') || 'La url debe terminar en 96!!'
	}
	let urlPreview = 'https://via.placeholder.com/150/d32776'
	let title = 'natus doloribus necessitatibus ipsa'
</script>

<div class="card">
	<div class="d-flex">
		<button class="btn" on:click={loadData}> load all photos </button>
		<button class="btn" on:click={() => (selectVisible = !selectVisible)}> Toggle select </button>
		<button class="btn" on:click={() => (disabled = !disabled)}> Toggle disabled </button>
	</div>

	<CForm on:submit={onSubmit}>
		<div class="d-grid gap-4 my-4">
			<div>
				<strong>Selected value</strong>
				<pre>{JSON.stringify(selectValue, null, 2)}</pre>
				<p><strong>thumbnailUrl only bind</strong>: {urlPreview}</p>
			</div>

			<CSelect
				items={photos}
				let:item
				rules={[required, validateSelect]}
				filterBy="url"
				placeholder="la patata"
			>
				{item.title}
			</CSelect>

			<!-- <CSelect
				label="Seleccione una foto"
				items={photos}
				let:item
				{loading}
				bind:value={selectValue}
				rules={[required]}
				filterBy="title"
			>
				{item.title}
			</CSelect> -->

			<!-- <CLabel label="Test rules" rules={[required]}>
				<input bind:value={inputValue} />
			</CLabel> -->
			<!-- <h1>{urlPreview}</h1>
			{#if selectVisible}
				<CSelect
					items={photos}
					let:item
					rules={[required, validateSelect]}
					filterBy="url"
					bind:value={selectValue}
					on:select-item={(e) => (urlPreview = e.detail.thumbnailUrl)}
				>
					{item.url}
				</CSelect>
			{/if} -->

			<!-- <p>Con foto en el input y titulo en los items</p>
			<button class="btn" on:click={() => (urlPreview = 'https://via.placeholder.com/150/771796')}>
				change thumnail
			</button>
			<CSelect
				items={photos}
				{loading}
				{disabled}
				let:item
				let:isList
				placeholder="Selecciona algo guay"
				rules={[required]}
				filterBy="title"
				selected={(item) => item.thumbnailUrl === urlPreview}
				onSelect={(item) => (urlPreview = item.thumbnailUrl)}
			>
				{#if isList}
					<img src="https://i.pravatar.cc/100?u={item.id}" alt={item.title} width="100" />
					<div>
						<strong>{item.title}</strong>
						<pre>{JSON.stringify(item, null, 2)}</pre>
					</div>
				{:else}
					<img src="https://i.pravatar.cc/30?u={item.id}" alt={item.title} loading="lazy" />
					{item.title}
				{/if}
			</CSelect> -->

			<button class="btn" type="submit"> submit </button>
		</div>
	</CForm>
</div>
