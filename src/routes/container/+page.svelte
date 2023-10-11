<div class="test-container">
	<div class="d-grid-container gap-3">
		{#each { length: 20 } as _}
			<div class="box"></div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../lib/styles/container.scss' as container;

	.test-container {
		container-type: inline-size;
	}
	.d-grid-container {
		--xs-columns: repeat(2, 1fr);
		--sm-columns: repeat(4, 1fr);
		--md-columns: repeat(6, 1fr);
		--lg-columns: repeat(10, 1fr);
	}
	.box {
		height: 150px;
		background-color: green;
	}
</style>
