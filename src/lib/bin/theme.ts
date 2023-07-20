export interface ThemeGeneratorConfig {
	config: ThemeConfig
	pathToSave: string
}

export interface ThemeConfig {
	[key: string]: {
		colorScheme: 'light' | 'dark'
		colors: {
			brand: string[]
			error: string[]
			success: string[]
			s: string[]
			[key: string]: string[]
		}
	}
}

const LIGHT_COLOR = '#d8dee3'
const DARK_COLOR = '#212529'

export function generateTheme(theme: ThemeConfig): string {
	const useConf = theme
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
	return result
}

function generateAllVars(useConf: ThemeConfig) {
	let result = ':root {\n'
	for (const theme in useConf) {
		for (const colorName in useConf[theme].colors) {
			const colors = useConf[theme].colors[colorName]
			if (colors) {
				if (colors.length === 1) {
					result += `\t--${colorName}-${theme}: ${colors[0]};\n`
					result += `\t--on-${colorName}-${theme}: ${contrast(colors[0])};\n`
				} else {
					for (let i = 1; i <= colors.length; i++) {
						const color = colors[i - 1]
						result += `\t--${colorName}-${theme}-${i}: ${color};\n`
						result += `\t--on-${colorName}-${theme}-${i}: ${contrast(color)};\n`
					}
				}
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
		if (theme.colors[colorName].length == 1) {
			result += `\t--${colorName}: var(--${colorName}-${themeName});\n`
			result += `\t--on-${colorName}: var(--on-${colorName}-${themeName});\n`
		} else {
			for (let i = 0; i < theme.colors[colorName].length; i++) {
				result += `\t--${colorName}-${i + 1}: var(--${colorName}-${themeName}-${i + 1});\n`
				result += `\t--on-${colorName}-${i + 1}: var(--on-${colorName}-${themeName}-${i + 1});\n`
			}
		}
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
			if (useConf[theme].colors[colorName].length === 1) {
				result += `\n.${colorName} {\n\tbackground-color: var(--${colorName});\n\toutline-color: var(--${colorName});\n\tborder-color: var(--${colorName});\n\color: var(--on-${colorName});\n}\n\n.${colorName}-text {\n\tcolor: var(--${colorName})\n}\n`
			} else {
				for (let i = 0; i < useConf[theme].colors[colorName].length; i++) {
					const key = i + 1
					result += `\n.${colorName}-${key} {\n\tbackground-color: var(--${colorName}-${key});\n\toutline-color: var(--${colorName}-${key});\n\tborder-color: var(--${colorName}-${key});\n\color: var(--on-${colorName}-${key});\n}\n\n.${colorName}-${key}-text {\n\tcolor: var(--${colorName}-${key})\n}\n`
				}
			}
			processedColors[colorName] = true
		}
	}
	return result
}

function contrast(hexColor: string) {
	const hex = hexColor.replace('#', '')
	const R = parseInt(hex.substring(0, 2), 16)
	const G = parseInt(hex.substring(2, 4), 16)
	const B = parseInt(hex.substring(4, 6), 16)
	const brightness = (Math.round(R * 299) + Math.round(G * 587) + Math.round(B * 114)) / 1000
	return brightness >= 128 ? DARK_COLOR : LIGHT_COLOR
}