<script lang="ts">
	import { CImageUploader } from '$lib'

	let url = ''
	async function uploadFunction(file: File) {
		const reader = new FileReader()
		reader.onload = function () {
			url = reader.result as string
		}
		reader.readAsDataURL(file)
	}
</script>

<img src={url} alt="" />
<CImageUploader {uploadFunction} cropImage></CImageUploader>
