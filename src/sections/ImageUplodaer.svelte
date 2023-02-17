<script lang="ts">
	import Section from './Section.svelte'
	import { CImageUploader } from '$lib'

	let preview = ''
	const w = 280
	const h = 450
	async function uploadFunc(file: File) {
		const reader = new FileReader()
		reader.onload = function () {
			preview = reader.result as string
		}
		reader.readAsDataURL(file)
	}
</script>

<Section title="ImageUplodaer">
	<CImageUploader uploadFunction={uploadFunc} cropImage aspectRatio={w / h} />
	<img src={preview} alt="preview" width={w} height={h} />
</Section>
