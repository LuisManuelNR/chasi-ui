<script lang="ts">
	import Section from './Section.svelte'
	import { CAvatar } from '$lib'
</script>

<Section title="Avatar">
	<div>
		<CAvatar text="Luis manuel" />
		<CAvatar text="manuel" />
		<CAvatar>
			<img src="https://i.pravatar.cc/48" alt="Pepita perez" width="48" height="48" />
		</CAvatar>
		<CAvatar frame>
			<img src="https://i.pravatar.cc/48" alt="Pepita perez" width="48" height="48" />
		</CAvatar>
	</div>
	<div>
		<CAvatar size="30px">
			<img src="https://i.pravatar.cc/30" alt="Pepita perez" width="30" height="30" />
		</CAvatar>
		<CAvatar frame size="60px">
			<img src="https://i.pravatar.cc/60" alt="Pepita perez" width="60" height="60" />
		</CAvatar>
	</div>
</Section>
