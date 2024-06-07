<script lang="ts">
	import type { ThemeConfig } from '$lib/theme.js'
	import { generateTheme } from '$lib/theme.js'
	import { CLabel } from '$lib'
	import { writable } from 'svelte/store'
	import { onMount } from 'svelte'
	const themes = writable<ThemeConfig>({
		light: {
			colorScheme: 'light',
			lightColor: '#d8dee3',
			darkColor: '#212529',
			colors: {
				brand: ['#c212f3'],
				accent: ['#19acf5'],
				error: ['#D72638'],
				success: ['#169873'],
				bg: ['#C4C9D4'],
				s: ['#F7F8F9', '#E9EBEF', '#DCDFE6', '#D0D4DD', '#C4C9D4', '#B8BECB']
			}
		},
		dark: {
			colorScheme: 'dark',
			lightColor: '#d8dee3',
			darkColor: '#212529',
			colors: {
				brand: ['#c212f3'],
				accent: ['#19acf5'],
				error: ['#D72638'],
				success: ['#169873'],
				bg: ['#2C303D'],
				s: ['#747F9C', '#59637E', '#464E63', '#373D4E', '#2C303D', '#222630']
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

<div class="typografy">
	<h2>Tipografías</h2>
	<p><strong>Tamaños</strong></p>
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
	<p><strong>Tamaños fluidos</strong></p>
	{#each Array.from({ length: 4 }) as _, i}
		<p class="f-fluid-{i}">Lorem ipsum, dolor sit amet consectetur</p>
	{/each}
</div>

<style>
	.typografy > * {
		margin-bottom: var(--size-3);
	}
</style>
