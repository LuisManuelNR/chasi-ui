// import type { ThemeGeneratorConfig } from '$lib/scripts/theme'

/** @type {import('$lib/scripts/theme').ThemeGeneratorConfig} */
const theme = {
  pathToSave: './src/lib/styles',
  config: {
    light: {
      colorScheme: 'light',
      colors: {
        brand: '#ff6047',
        error: '#D72638',
        success: '#169873',
        info: '#FFD3BA',
        'n-100': '#f0f1f4',
        'n-200': '#e1e4ea',
        'n-300': '#d3d7df',
        'n-400': '#c4c9d4'
      }
    },
    dark: {
      colorScheme: 'dark',
      colors: {
        brand: '#D64933',
        error: '#D72638',
        success: '#169873',
        info: '#FFD3BA',
        'n-100': '#8f97ae',
        'n-200': '#5c6784',
        'n-300': '#404859',
        'n-400': '#363c4a'
      }
    }
  }
}

export default theme