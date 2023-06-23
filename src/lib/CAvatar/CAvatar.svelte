<script lang="ts">
	export let frame = false
	export let text = ''
	export let size = '48px'

	let klass = ''
	export { klass as class }

	$: FirstLetter = text.charAt(0)
</script>

<div class="c-avatar {klass}" class:frame style="--size: {size};" title={text}>
	<div class="c-avatar-container">
		<slot>
			<span>{FirstLetter}</span>
		</slot>
	</div>
</div>

<style lang="scss">
	:where(.c-avatar) {
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
			:global(img) {
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
</style>
