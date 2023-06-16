<script lang="ts">
	import Section from './Section.svelte'
	import { CMenu, CIcon, CDialog } from '$lib'
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
		<CDialog let:open let:close>
			<button class="btn" slot="action" on:click={open}>incide a dialog</button>
			<div class="d-flex gap-4">
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
				<button class="btn" on:click={close}>close</button>
			</div>
		</CDialog>
		<span class="ml-auto" />
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
