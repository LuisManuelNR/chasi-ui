<script lang="ts">
	import { CMenu, CIcon, CDialog } from '$lib'
	import { mdiDotsVertical, mdiStar } from '@mdi/js'

	const camionDeMierda =
		'M23.51,9.69,20.76,6.28a1.91,1.91,0,0,0-1.37-.66H14.83V5.11a1.06,1.06,0,0,0-1.06-1.06H1.06A1.07,1.07,0,0,0,0,5.11V16.2a1.06,1.06,0,0,0,1.06,1.06H3.32a2.82,2.82,0,0,0,5.64,0h6.78a2.82,2.82,0,0,0,5.64,0h1.56A1.06,1.06,0,0,0,24,16.2V11.08a2.52,2.52,0,0,0-.49-1.4ZM23.15,11H18a.21.21,0,0,1-.21-.21V8.42A.21.21,0,0,1,18,8.21h3.27l1.62,2a1.76,1.76,0,0,1,.3.8Zm-17,8.08a2,2,0,1,1,2-2A2,2,0,0,1,6.14,19.1Zm6.26-2.69H8.88a2.82,2.82,0,0,0-5.47,0H1.06a.21.21,0,0,1-.21-.21V5.11a.22.22,0,0,1,.21-.21H13.77a.22.22,0,0,1,.22.21V16.2a.21.21,0,0,1-.22.21Zm6.16,2.69a2,2,0,1,1,2-2A2,2,0,0,1,18.56,19.1Zm4.38-2.69H21.3a2.82,2.82,0,0,0-5.47,0h-1a.71.71,0,0,0,0-.21V6.47h4.56a1.13,1.13,0,0,1,.71.34l.44.55H18A1.07,1.07,0,0,0,16.9,8.42v2.39A1.07,1.07,0,0,0,18,11.87h5.19V16.2a.21.21,0,0,1-.21.21Z'
</script>

<div class="d-flex gap-2 align-center">
	<CMenu>
		<ul class="menu-content">
			<li>one</li>
			<li>two</li>
			<li>three</li>
			<li>four</li>
		</ul>
	</CMenu>
	<CMenu>
		<button on:click={toggle} slot="action" let:toggle class="btn icon">
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
	<CDialog let:close persistent>
		<button class="btn" slot="action" let:open on:click={open}>incide a dialog</button>
		<div class="d-flex gap-4">
			<CMenu>
				<button on:click={toggle} let:toggle slot="action" class="btn icon">
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
	<CMenu>
		<button on:click={toggle} let:toggle slot="action" class="btn icon">
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

<p>size: 18 <CIcon icon={mdiStar} size={18} /></p>
<p>size: 24 (default) <CIcon icon={mdiStar} /></p>
<p>size: 30 <CIcon icon={mdiStar} size={30} /></p>
<p>size: 40 <CIcon icon={mdiStar} size={40} /></p>
<br />
<p>size: 18 <CIcon icon={camionDeMierda} size={18} /></p>
<p>size: 24 (default) <CIcon icon={camionDeMierda} /></p>
<p>size: 30 <CIcon icon={camionDeMierda} size={30} /></p>
<p>size: 40 <CIcon icon={camionDeMierda} size={40} /></p>

<div class="cosa-grande"></div>

<style lang="scss">
	.menu-content {
		background-color: var(--s-2);
		min-width: 100px;
		/* padding: var(--size-3); */
		box-shadow: var(--shadow-4);
		border-radius: var(--size-1);
		list-style: none;
		.list-item {
			width: 100%;
		}
	}
	.cosa-grande {
		min-height: 2000px;
	}
</style>
