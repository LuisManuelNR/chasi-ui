<script lang="ts">
	import CDialog from '../CDialog/CDialog.svelte'
	import { pannable, zoomable } from '../Actions'

	export let uploadFunction: (file: File) => Promise<void>
	export let aspectRatio: string | number = '4/3'
	export let cropImage = false

	let loading = false
	let dialog: CDialog
	let fileInput: HTMLInputElement
	let imgElement: HTMLImageElement
	let cropElement: HTMLDivElement

	// load image
	function selectImage() {
		fileInput.click()
	}

	async function onSelectFile(e: Event) {
		loading = true
		const target = e.target as HTMLInputElement
		if (target.files) {
			if (!cropImage && uploadFunction) {
				await uploadFunction(target.files[0])
				loading = false
				fileInput.value = ''
			} else {
				const reader = new FileReader()
				reader.onload = function () {
					showPreview(reader.result as string)
					loading = false
					fileInput.value = ''
				}
				reader.readAsDataURL(target.files[0])
			}
		}
	}
	// setup image to crop
	let croppBounds: DOMRect
	let tx = 0
	let ty = 0
	let tox = 0.5
	let toy = 0.5
	let iw = 0
	let ih = 0
	function showPreview(url: string) {
		tx = ty = iw = ih = 0 // reset
		const dialogElement = cropElement.closest('dialog')!
		dialogElement.addEventListener(
			'animationend',
			() => {
				const borders = 4
				croppBounds = cropElement.getBoundingClientRect()
				croppBounds.width -= borders
				croppBounds.height -= borders
				if (croppBounds.width > croppBounds.height) {
					const newH = (imgElement.naturalHeight / imgElement.naturalWidth) * croppBounds.width
					// adjust image size to cropp viewport
					ih = newH < croppBounds.height ? croppBounds.height : newH
					iw = ih * (imgElement.naturalWidth / imgElement.naturalHeight)
				} else {
					const newW = (imgElement.naturalWidth / imgElement.naturalHeight) * croppBounds.height
					// adjust image size to cropp viewport
					iw = newW < croppBounds.width ? croppBounds.width : newW
					ih = iw * (imgElement.naturalHeight / imgElement.naturalWidth)
				}
				// center image
				tx = croppBounds.width / 2 - iw / 2
				ty = croppBounds.height / 2 - ih / 2
			},
			{ once: true }
		)
		dialog.open()
		imgElement.src = url
	}

	function translate(dx: number, dy: number) {
		const minX = croppBounds.width - iw
		const maxX = 0
		const minY = croppBounds.height - ih
		const maxY = 0
		tx += dx
		ty += dy
		if (tx > maxX) {
			tx = maxX
			tox = 0
		}
		if (tx < minX) {
			tx = minX
			tox = 1
		}
		if (ty > maxY) {
			ty = maxY
			toy = 0
		}
		if (ty < minY) {
			ty = minY
			toy = 1
		}
	}

	function onZoom(delta: number, center: { x: number; y: number }, isTouch: boolean) {
		const croppBorders = 2
		const imgMinX = croppBounds.left + tx + croppBorders
		const imgMaxX = imgMinX + iw
		const imgMinY = croppBounds.top + ty + croppBorders
		const imgMaxY = imgMinY + ih
		tox = linearScale(center.x, imgMinX, imgMaxX, 0, 1)
		toy = linearScale(center.y, imgMinY, imgMaxY, 0, 1)
		let step: number
		if (isTouch) {
			step = linearScale(delta, -7, 7, 1.05, 0.95)
		} else {
			step = delta > 0 ? 0.9 : 1.1
		}
		const newIw = iw * step
		const newIh = ih * step
		let dx = (newIw - iw) * tox
		let dy = (newIh - ih) * toy
		iw = newIw
		ih = newIh
		if (iw < croppBounds.width) {
			const ar = ih / iw
			iw = croppBounds.width
			ih = iw * ar
			dy = 0
		}
		if (ih < croppBounds.height) {
			const ar = iw / ih
			ih = croppBounds.height
			iw = ih * ar
			dx = 0
		}
		translate(-dx, -dy)
	}

	function crop() {
		if (uploadFunction) {
			loading = true
			const buffer = document.createElement('canvas')
			const ctx = buffer.getContext('2d')!
			const imgBound = imgElement.getBoundingClientRect()
			const borders = 2

			buffer.width = linearScale(croppBounds.width, 0, imgBound.width, 0, imgElement.naturalWidth)
			buffer.height = linearScale(
				croppBounds.height,
				0,
				imgBound.height,
				0,
				imgElement.naturalHeight
			)
			// black background
			ctx.fillStyle = '#000'
			ctx.fillRect(0, 0, buffer.width, buffer.height)

			const sx = linearScale(
				croppBounds.left - imgBound.left + borders,
				0,
				imgBound.width,
				0,
				imgElement.naturalWidth
			)
			const sy = linearScale(
				croppBounds.top - imgBound.top + borders,
				0,
				imgBound.height,
				0,
				imgElement.naturalHeight
			)

			ctx.drawImage(
				imgElement,
				sx,
				sy,
				buffer.width,
				buffer.height,
				0,
				0,
				buffer.width,
				buffer.height
			)
			buffer.toBlob(async (blob) => {
				if (blob) {
					const file = new File([blob], 'preview', {
						lastModified: new Date().getTime(),
						type: blob.type
					})
					await uploadFunction(file)
				}
				loading = false
				dialog.close()
			}, 'image/jpeg')

			buffer.remove()
		} else {
			dialog.close()
		}
	}

	function linearScale(point: number, minD: number, maxD: number, minR: number, maxR: number) {
		if (minD === maxD) return point
		const ratio = (maxR - minR) / (maxD - minD)
		return minR + ratio * (point - minD)
	}
</script>

<input type="file" hidden accept="image/*" bind:this={fileInput} on:change={onSelectFile} />

<CDialog let:close bind:this={dialog}>
	<slot name="action" slot="action" {selectImage}>
		<button class="btn" on:click={selectImage}> Subir imagen </button>
	</slot>
	<div class="c-fileuploader" style="--aspect-ratio:{aspectRatio};">
		<div
			class="preview"
			use:pannable={{ onMove: (c) => translate(c.dx, c.dy) }}
			use:zoomable={{ onZoom }}
		>
			<div
				class="cropp-zone"
				bind:this={cropElement}
				style="--aspect-ratio:{aspectRatio}; --tx:{tx}px; --ty:{ty}px; --iw:{iw}px; --ih:{ih}px"
			>
				<img src="" alt="preview" bind:this={imgElement} />
			</div>
		</div>
		<div class="d-flex mt-4">
			<button on:click={close} class="btn tonal"> Cancelar </button>
			<button on:click={crop} class="btn brand ml-auto" class:loading> Confirmar </button>
		</div>
	</div>
</CDialog>

<style lang="scss">
	.c-fileuploader {
		--padding: 25px;
		max-height: 85vh;
		aspect-ratio: var(--aspect-ratio);
		margin: 0 auto;
		.preview {
			padding: var(--padding);
			box-shadow: inset 0 0 0 var(--padding) #0000006e;
			overflow: hidden;
			cursor: grab;
			user-select: none;
			.cropp-zone {
				border: 2px solid white;
				position: relative;
				&::before {
					content: '';
					display: block;
					padding-bottom: calc(100% / (var(--aspect-ratio)));
				}
				:global(img) {
					position: absolute;
					transform: translate(var(--tx), var(--ty));
					width: var(--iw);
					height: var(--ih);
					top: 0;
					left: 0;
					z-index: -1;
				}
			}
		}
	}
</style>
