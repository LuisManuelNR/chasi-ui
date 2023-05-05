<script lang="ts">
	import Section from './Section.svelte'
	import { CIcon } from '$lib'
	import { mdiBusAlert } from '@mdi/js'
</script>

<Section title="Buttons">
	<div>
		<h3 class="mb-1">Styles</h3>
		<button class="btn"> default </button>
		<button class="btn outlined"> outlined</button>
		<button class="btn tonal"> tonal</button>
		<button class="btn tonal outlined"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">Styles with brand color</h3>
		<button class="btn brand"> default </button>
		<button class="btn outlined brand"> outlined</button>
		<button class="btn tonal brand-text"> tonal</button>
		<button class="btn tonal outlined brand-text"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">Styles with success color</h3>
		<button class="btn success"> default </button>
		<button class="btn outlined success"> outlined</button>
		<button class="btn tonal success-text"> tonal</button>
		<button class="btn tonal outlined success-text"> tonal outlined</button>
	</div>
	<div>
		<h3 class="mb-1">As icon</h3>
		<button class="btn icon"> D </button>
		<button class="btn outlined icon"> O</button>
		<button class="btn tonal icon"> T</button>
		<button class="btn tonal outlined icon"> TO</button>
	</div>
	<div>
		<h3 class="mb-1">As icon color</h3>
		<button class="btn outlined icon brand"> O</button>
		<button class="btn tonal icon brand-text"> T</button>
		<button class="btn icon brand">
			<CIcon icon={mdiBusAlert} />
		</button>
		<button class="btn tonal outlined icon brand-text"> TO</button>
	</div>
</Section>
