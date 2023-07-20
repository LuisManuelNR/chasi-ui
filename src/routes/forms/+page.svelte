<script lang="ts">
	import { CLabel } from '$lib'
</script>

<div class="d-flex gap-4 flex-column card mb-4">
	<CLabel label="Text">
		<input />
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

<div class="d-flex gap-4 flex-column card">
	<CLabel label="Text">
		<input />
	</CLabel>
	<CLabel>
		<input />
	</CLabel>
	<CLabel label="Text">
		<input disabled />
	</CLabel>
	<CLabel>
		<input disabled />
	</CLabel>
	<CLabel label="Text" loading>
		<input />
	</CLabel>
	<CLabel loading>
		<input />
	</CLabel>
	<CLabel label="Text">
		<input placeholder="Escribe aqui...." />
	</CLabel>
	<CLabel>
		<input placeholder="Escribe aqui...." />
	</CLabel>
</div>
