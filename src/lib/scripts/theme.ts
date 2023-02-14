import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

export interface ThemeGeneratorConfig {
	config: ThemeConfig
	pathToSave: string
}

interface ThemeConfig {
	[key: string]: {
		colorScheme: string
		colors: {
			brand: string
			error: string
			success: string
			[key: string]: string | undefined
		}
	}
}

export async function generateTheme({ cwd = process.cwd() } = {}) {
	const config_file = path.join(cwd, 'src/theme.js')
	if (!fs.existsSync(config_file)) throw new Error('theme.js not found!!')
	const configModule = await import(`${url.pathToFileURL(config_file).href}?ts=${Date.now()}`) as { default: ThemeGeneratorConfig }
	const { config, pathToSave } = configModule.default
	const useConf = config || {}
	let result = '/* ESTE ERCHIVO ES AUTOGENERADO */\n'
	// generate theme vars
	result += generateAllVars(useConf)
	// generate default first
	const firstThemeName = Object.keys(useConf)[0]
	const firstTheme = useConf[firstThemeName]
	result += generateLocalTheme(firstTheme, firstThemeName, ':root')
	// generate prefer schema dark
	if (useConf.dark) {
		result += `@media (prefers-color-scheme: dark) {
      ${generateLocalTheme(useConf.dark, 'dark', ':root')}
    }\n`
	}
	// generate every theme vars and class setup
	for (const theme in useConf) {
		result += generateLocalTheme(useConf[theme], theme, `.${theme}-theme`)
	}
	result += generateColorClasses(useConf)
	fs.writeFileSync(`${pathToSave}/theme.scss`, result)
	console.log(`File generated in ${pathToSave}/theme.scss`)
}

function generateAllVars(useConf: ThemeConfig) {
	let result = ':root {\n'
	for (const theme in useConf) {
		for (const colorName in useConf[theme].colors) {
			const color = useConf[theme].colors[colorName]
			if (color) {
				const isHex = /^#([0-9a-f]{3}){1,2}$/i.test(color)
				if (!isHex) throw new Error('Colors must be in hex representation')
				result += `\t--${colorName}-${theme}: ${color};\n`
			}
		}
		result += '\n'
	}
	result += '}\n'
	return result
}

function generateLocalTheme(theme: ThemeConfig[string], themeName: string, selector: string) {
	let result = `${selector} {\n\tcolor-scheme: ${theme.colorScheme};\n`
	for (const colorName in theme.colors) {
		result += `\t--${colorName}: var(--${colorName}-${themeName});\n`
	}
	result += '}\n'
	return result
}

function generateColorClasses(useConf: ThemeConfig) {
	let result = ''
	const processedColors: Record<string, boolean> = {}
	for (const theme in useConf) {
		for (const colorName in useConf[theme].colors) {
			if (processedColors[colorName]) continue
			result += `\n.${colorName} {\n\tbackground-color: var(--${colorName});\n\toutline-color: var(--${colorName});\n\tborder-color: var(--${colorName});\n}\n\n.${colorName}-text {\n\tcolor: var(--${colorName})\n}\n`
			processedColors[colorName] = true
		}
	}
	return result
}

generateTheme()
