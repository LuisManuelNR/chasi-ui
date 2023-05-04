/** @type {import('$lib/scripts/theme').ThemeGeneratorConfig} */
const theme = {
  pathToSave: './src/lib/styles',
  config: {
    light: {
      colorScheme: 'light',
      colors: {
        brand: '#603ad1',
        error: '#D72638',
        success: '#169873',
        'n-100': '#f0f1f4',
        'n-200': '#e1e4ea',
        'n-300': '#d3d7df',
        'n-400': '#c4c9d4'
      }
    },
    dark: {
      colorScheme: 'dark',
      colors: {
        brand: '#7a55e9',
        error: '#D72638',
        success: '#169873',
        'n-100': '#424b5c',
        'n-200': '#333a47',
        'n-300': '#242932',
        'n-400': '#1e2129'
      }
    }
  }
}

export default theme