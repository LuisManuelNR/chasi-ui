import type { ThemeGeneratorConfig } from '$lib/scripts/theme'

const theme: ThemeGeneratorConfig = {
  pathToSave: './',
  config: {
    light: {
      colorScheme: 'light',
      colors: {
        brand: '#ff6047',
        'n-100': '#f0f1f4',
        'n-200': '#e1e4ea',
        'n-300': '#d3d7df',
        'n-400': '#c4c9d4',
        error: '#D72638',
        success: '#169873',
        info: '#FFD3BA'
      }
    },
    dark: {
      colorScheme: 'dark',
      colors: {
        brand: '#D64933',
        'n-100': '#555e77',
        'n-200': '#495269',
        'n-300': '#404859',
        'n-400': '#363c4a',
        error: '#D72638',
        success: '#169873',
        info: '#FFD3BA'
      }
    }
  }
}

export default theme