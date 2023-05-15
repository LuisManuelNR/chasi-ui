<script lang="ts">
	import Section from './Section.svelte'
	import { CMenu, CIcon } from '$lib'
	import { mdiDotsVertical } from '@mdi/js'
</script>

<Section title="Menu">
	<div class="d-flex gap-2 align-center">
		<CMenu>
			<ul class="menu-content">
				<li>one</li>
				<li>two</li>
				<li>three</li>
				<li>four</li>
			</ul>
		</CMenu>
		<CMenu let:toggle closeOnClick>
			<button on:click={toggle} slot="action" class="btn icon">
				<CIcon icon={mdiDotsVertical} />
			</button>

			<div class="menu-content">
				<button class="list-item">click</button>
				<button class="list-item">click</button>
				<button class="list-item">click</button>
				<button class="list-item">click</button>
				<button class="list-item">click</button>
			</div>
		</CMenu>
	</div>
</Section>

<style lang="scss">
	.menu-content {
		background-color: var(--n-200);
		min-width: 100px;
		/* padding: var(--size-3); */
		box-shadow: var(--shadow-4);
		border-radius: var(--size-1);
		list-style: none;
		.list-item {
			width: 100%;
		}
	}
</style>
