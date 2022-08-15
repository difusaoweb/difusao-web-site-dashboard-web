import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const theme = createTheme({
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
})
