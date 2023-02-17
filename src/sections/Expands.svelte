<script lang="ts">
	import Section from './Section.svelte'
	import { CExpand } from '$lib'
</script>

<Section title="Expand">
	<CExpand>
		<p slot="header">I have more content</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero accusamus nam distinctio qui
			vel doloremque blanditiis impedit, mollitia perferendis maiores praesentium, aperiam ad
			reiciendis quas omnis laborum suscipit autem ea laboriosam repellat. Quaerat blanditiis
			possimus molestiae aliquam temporibus est quisquam.
		</p>
	</CExpand>
	<CExpand>
		<p slot="header">I have more content too</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero accusamus nam distinctio qui
			vel doloremque blanditiis impedit
		</p>
	</CExpand>
</Section>
