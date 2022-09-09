import { createTheme, ComponentsOverrides } from '@mui/material/styles'

const themeConst = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#857dcc'
    },
    secondary: {
      main: '#a7a7a7'
    },
    success: {
      main: '#519668'
    },
    error: {
      main: '#c77171',
      dark: '#e55353'
    },
    warning: {
      main: '#d5a439'
    },
    info: {
      main: '#5299e0'
    },
    background: {
      default: '#181924',
      paper: '#24252f'
    }
  }
}

export const theme = createTheme({
  palette: {
    mode: themeConst.palette.mode,
    primary: {
      main: themeConst.palette.primary.main
    },
    secondary: {
      main: themeConst.palette.secondary.main
    },
    success: {
      main: themeConst.palette.success.main
    },
    error: {
      main: themeConst.palette.error.main,
      dark: themeConst.palette.error.dark
    },
    warning: {
      main: themeConst.palette.warning.main
    },
    info: {
      main: themeConst.palette.info.main
    },
    background: {
      default: themeConst.palette.background.default,
      paper: themeConst.palette.background.paper
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `:root {
        --palette-primary-main: ${themeConst.palette.primary.main};
        --palette-error-main: ${themeConst.palette.error.main};
      }`
    }
  }
})
