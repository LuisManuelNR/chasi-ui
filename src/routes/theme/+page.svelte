<script lang="ts">
	import type { ThemeConfig } from '$lib/bin/theme.js'
	import { generateTheme } from '$lib/bin/theme.js'
	import { CLabel } from '$lib'
	import { writable } from 'svelte/store'
	const themes = writable<ThemeConfig>({
		dark: {
			colorScheme: 'dark',
			colors: {
				brand: ['#7a55e9'],
				accent: ['#E7d623'],
				error: ['#D72638'],
				success: ['#169873'],
				surface: [
					'#424b5c',
					'#3b4453',
					'#353c4a',
					'#2e3540',
					'#282d37',
					'#21262e',
					'#1a1e25',
					'#14161c'
				]
			}
		},
		light: {
			colorScheme: 'light',
			colors: {
				brand: ['#1a55e9'],
				accent: ['#E7d623'],
				error: ['#D72638'],
				success: ['#169873'],
				surface: [
					'#424b5c',
					'#3b4453',
					'#353c4a',
					'#2e3540',
					'#282d37',
					'#21262e',
					'#1a1e25',
					'#14161c',
					'#0d0f12',
					'#0d0f12'
				]
			}
		}
	})
	let result = ''
	themes.subscribe((v) => {
		result = generateTheme(v)
	})

	$: compStyle = `<style>${result}</style>`

	let currentTheme = 'dark'
	$: currentColors = Object.keys($themes[currentTheme].colors)

	function copyCSS() {
		navigator.clipboard.writeText(result)
	}
</script>

<svelte:head>
	{@html compStyle}
</svelte:head>

<div>
	<h2>Theme</h2>
	<div class="d-flex">
		<CLabel label="Dark theme">
			<input type="radio" value="dark" bind:group={currentTheme} />
		</CLabel>
		<CLabel label="Light theme">
			<input type="radio" value="light" bind:group={currentTheme} />
		</CLabel>
		<button class="btn" on:click={copyCSS}> Copy themes css </button>
	</div>
	<strong>Current theme: {currentTheme}</strong>
	{#each currentColors as color}
		<div class="d-flex flex-wrap">
			{#if $themes[currentTheme].colors[color].length === 1}
				<CLabel label={color}>
					<input type="color" bind:value={$themes[currentTheme].colors[color][0]} />
				</CLabel>
			{:else}
				{#each $themes[currentTheme].colors[color] as value, i}
					<CLabel label="{color}-{i + 1}">
						<input type="color" bind:value />
					</CLabel>
				{/each}
			{/if}
		</div>
	{/each}
</div>

<div>
	<h2>Tipografías</h2>
	<strong>Tamaños</strong>
	<p class="f-size-00">
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente hic velit quidem accusamus
		rem. Earum?
	</p>
	{#each Array.from({ length: 7 }) as _, i}
		<p class="f-size-{i}">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente hic velit quidem accusamus
			rem. Earum?
		</p>
	{/each}
	<strong>Tamaños fluidos</strong>
	{#each Array.from({ length: 4 }) as _, i}
		<p class="f-fluid-{i}">Lorem ipsum, dolor sit amet consectetur</p>
	{/each}
</div>
