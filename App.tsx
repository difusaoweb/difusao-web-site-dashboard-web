import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { Routes } from './src/routes'
import { theme } from './src/styles/theme'
import { store } from './src/redux'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ReduxProvider>
    </ThemeProvider>
  </React.StrictMode>
)
