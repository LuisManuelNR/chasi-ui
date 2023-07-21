<script lang="ts">
	import type { ThemeConfig } from '$lib/bin/theme.js'
	import { generateTheme } from '$lib/bin/theme.js'
	import { CLabel } from '$lib'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'
	const themes = writable<ThemeConfig>({
		light: {
			colorScheme: 'light',
			colors: {
				brand: ['#603ad1'],
				accent: ['#e538ce'],
				error: ['#D72638'],
				success: ['#169873'],
				s: ['#f9fafb', '#f0f1f4', '#e1e4ea', '#d3d7df', '#c4c9d4', '#b2b9c7']
			}
		},
		dark: {
			colorScheme: 'dark',
			colors: {
				brand: ['#7a55e9'],
				accent: ['#E7d623'],
				error: ['#D72638'],
				success: ['#169873'],
				s: ['#38424F', '#2F3742', '#272E37', '#1F252C', '#191D23', '#14181C']
			}
		}
	})
	let result = ''
	themes.subscribe((v) => {
		result = generateTheme(v)
	})

	$: compStyle = `<style>${result}</style>`

	let currentTheme = writable('dark')
	$: currentColors = Object.keys($themes[$currentTheme].colors)

	function copyCSS() {
		navigator.clipboard.writeText(result)
	}

	onMount(() => {
		const html = document.querySelector('html')!
		currentTheme.subscribe((value) => {
			if (value === 'dark') {
				html.classList.remove('ligth-theme')
				html.classList.add('dark-theme')
			} else {
				html.classList.add('light-theme')
				html.classList.remove('dark-theme')
			}
		})
	})
</script>

<svelte:head>
	{@html compStyle}
</svelte:head>

<div>
	<h2>Theme</h2>
	<div class="d-flex gap-3">
		<CLabel label="Dark theme">
			<input type="radio" value="dark" bind:group={$currentTheme} />
		</CLabel>
		<CLabel label="Light theme">
			<input type="radio" value="light" bind:group={$currentTheme} />
		</CLabel>
		<button class="btn" on:click={copyCSS}> Copy themes css </button>
	</div>
	<strong>Current theme: {$currentTheme}</strong>
	{#each currentColors as color}
		{#if $themes[$currentTheme].colors[color].length === 1}
			<div class="d-flex gap-2 mb-2">
				<CLabel label={color}>
					<input bind:value={$themes[$currentTheme].colors[color][0]} />
				</CLabel>
				<CLabel>
					<input type="color" bind:value={$themes[$currentTheme].colors[color][0]} />
				</CLabel>
			</div>
		{:else}
			{#each $themes[$currentTheme].colors[color] as value, i}
				<div class="d-flex gap-2 mb-2">
					<CLabel label="{color}-{i + 1}">
						<input bind:value />
					</CLabel>
					<CLabel>
						<input type="color" bind:value />
					</CLabel>
				</div>
			{/each}
		{/if}
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
