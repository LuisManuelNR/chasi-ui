<script lang="ts">
	import Section from './Section.svelte'
	import { CIcon } from '$lib'
	import { mdiPencil } from '@mdi/js'
</script>

<Section title="Buttons">
	<div>
		<h3 class="mb-1">Default</h3>
		<button class="btn"> default </button>
		<button class="btn brand"> default</button>
		<button class="btn success"> default</button>
		<button class="btn error"> default</button>
	</div>
	<div>
		<h3 class="mb-1">Default</h3>
		<button disabled class="btn"> default </button>
		<button disabled class="btn brand"> default</button>
		<button disabled class="btn success"> default</button>
		<button disabled class="btn error"> default</button>
	</div>
	<div>
		<h3 class="mb-1">Ghost</h3>
		<button class="btn ghost"> Ghost </button>
		<button class="btn ghost brand-text"> Ghost</button>
		<button class="btn ghost success-text"> Ghost</button>
		<button class="btn ghost error-text"> Ghost</button>
	</div>
	<div>
		<h3 class="mb-1">Tonal</h3>
		<button class="btn tonal"> Tonal </button>
		<button class="btn tonal brand-text"> Tonal</button>
		<button class="btn tonal success-text"> Tonal</button>
		<button class="btn tonal error-text"> Tonal</button>
	</div>
	<div>
		<h3 class="mb-1">Outlined</h3>
		<button class="btn outlined"> Outlined </button>
		<button class="btn outlined brand"> Outlined</button>
		<button class="btn outlined success"> Outlined</button>
		<button class="btn outlined error"> Outlined</button>
	</div>

	<div>
		<h3 class="mb-1">Default icon</h3>
		<button class="btn icon"> <CIcon icon={mdiPencil} /> </button>
		<button class="btn icon brand"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon success"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon error"> <CIcon icon={mdiPencil} /></button>
	</div>
	<div>
		<h3 class="mb-1">Ghost icon</h3>
		<button class="btn icon ghost"> <CIcon icon={mdiPencil} /> </button>
		<button class="btn icon ghost brand-text"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon ghost success-text"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon ghost error-text"> <CIcon icon={mdiPencil} /></button>
	</div>
	<div>
		<h3 class="mb-1">Tonal icon</h3>
		<button class="btn icon tonal"> <CIcon icon={mdiPencil} /> </button>
		<button class="btn icon tonal brand-text"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon tonal success-text"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon tonal error-text"> <CIcon icon={mdiPencil} /></button>
	</div>
	<div>
		<h3 class="mb-1">Outlined icon</h3>
		<button class="btn icon outlined"> <CIcon icon={mdiPencil} /> </button>
		<button class="btn icon outlined brand"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon outlined success"> <CIcon icon={mdiPencil} /></button>
		<button class="btn icon outlined error"> <CIcon icon={mdiPencil} /></button>
	</div>
</Section>
