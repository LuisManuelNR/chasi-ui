<script lang="ts">
	import { CLabel } from '$lib'
</script>

<div class="d-flex gap-4 flex-column card n-300">
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
