<script lang="ts">
	import { CDialog, CForm, CNotifier, CLabel, CSelect } from '$lib'
	import CIcon from '$lib/CIcon/CIcon.svelte'
	import { mdiClose } from '@mdi/js'

	let visible = false
	let text = ''
	let loading = false
	let list = ['cosa 1', 'cosa 2', 'cosa 3', 'cosa 4']

	const required = (v: any) => !!v || 'Este campo es requerido'

	async function onSubmit() {
		loading = true
		await sleep()
		loading = false
		CNotifier.info('Form submited')
		visible = false
	}
	function sleep() {
		return new Promise((resolve) => setTimeout(resolve, 3000))
	}
</script>

<CDialog bind:active={visible}>
	<div class="mb-2 d-flex">
		<h1>HEY IM A DIALOG</h1>
		<button class="btn ghost icon ml-auto" on:click={() => (visible = false)}>
			<CIcon icon={mdiClose}></CIcon>
		</button>
	</div>
	<div class:loading-inline={loading}>
		<CForm on:submit={onSubmit}>
			<CLabel rules={[required]} class="mb-4">
				<input type="text" bind:value={text} />
			</CLabel>
			<!-- <CDialog>
				<button slot="action" class="btn">dddd</button>
				patata
			</CDialog> -->
			<CSelect items={list} rules={[required]}></CSelect>
			<CLabel rules={[required]} class="mb-4">
				<input type="text" />
			</CLabel>
			<div class="d-flex">
				<button class="btn brand" type="submit"> submit </button>
			</div>
		</CForm>
	</div>
</CDialog>

<button class="btn" on:click={() => (visible = true)}> open </button>
