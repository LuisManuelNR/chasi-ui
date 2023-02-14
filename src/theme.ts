import type { ThemeGeneratorConfig } from '$lib/scripts/theme'

const theme: ThemeGeneratorConfig = {
  pathToSave: './src/lib/styles',
  config: {
    light: {
      colorScheme: 'light',
      colors: {
        brand: '#ff6047',
        'n-100': '#F8F9FA',
        'n-200': '#E9ECEF',
        'n-300': '#DEE2E6',
        'n-400': '#CED4DA',
        error: '#D72638',
        success: '#169873',
        info: '#FFD3BA'
      }
    },
    dark: {
      colorScheme: 'dark',
      colors: {
        brand: '#D64933',
        'n-100': '#ADB5BD',
        'n-200': '#6C757D',
        'n-300': '#495057',
        'n-400': '#343A40',
        error: '#D72638',
        success: '#169873',
        info: '#FFD3BA'
      }
    }
  }
}

export default theme