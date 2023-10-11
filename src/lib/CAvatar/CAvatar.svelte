<script lang="ts">
	export let frame = false
	export let text = ''
	export let size = '48px'
	export let src = ''

	let klass = ''
	export { klass as class }

	$: FirstLetter = text.charAt(0)
</script>

<div class="c-avatar {klass}" class:frame style="--size: {size};" title={text}>
	<div class="c-avatar-container">
		{#if src}
			<img {src} alt={text} />
		{:else}
			<span>{FirstLetter}</span>
		{/if}
	</div>
</div>

<style lang="scss">
	@layer ChasiAvatar {
		.c-avatar {
			--scale: 1.1;
			width: var(--size);
			height: var(--size);
			font-weight: 600;
			border-radius: var(--size-10);
			display: inline-block;
			&.frame {
				outline: 2px solid;
			}
			.c-avatar-container {
				width: 100%;
				height: 100%;
				border-radius: inherit;
				overflow: hidden;
				text-transform: capitalize;
				background-color: var(--s-1);
				img {
					width: 100%;
					transform: scale(var(--img-scale));
					transition: transform 0.2s;
				}
				span {
					white-space: nowrap;
					width: 100%;
					height: 100%;
					display: grid;
					place-content: center;
				}
			}
			&:hover {
				--img-scale: 1.3;
			}
		}
	}
</style>
