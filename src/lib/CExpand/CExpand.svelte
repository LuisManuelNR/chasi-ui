<script lang="ts">
	import CIcon from '../CIcon/CIcon.svelte'
	import { mdiPlus } from '@mdi/js'

	let active = false

	function toggle() {
		active = !active
	}
</script>

<slot name="action">
	<button class="btn d-flex align-center pa-2 gap-2" class:active on:click|stopPropagation={toggle}>
		<slot name="title">Panel header</slot>
		<div class="action-icon ml-auto">
			<slot name="icon">
				<CIcon icon={mdiPlus} />
			</slot>
		</div>
	</button>
</slot>
<div class="c-expand-content" class:active-content={active}>
	<div class="content-wrapper">
		<slot {toggle} isOpen={active} />
	</div>
</div>

<style lang="scss">
	button {
		width: 100%;
		transition: 0.2s ease;
	}
	.action-icon {
		rotate: 0deg;
		transition: rotate 0.5s ease;
	}
	.c-expand-content {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 250ms;
		> .content-wrapper {
			overflow: hidden;
		}
		&.active-content {
			grid-template-rows: 1fr;
		}
	}
	.active {
		padding: 24px 1rem;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		.action-icon {
			rotate: -45deg;
		}
	}
</style>
