import * as React from 'react'
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { Copyright } from '../../components/atoms/Copyright'
import { AppBar } from '../../components/atoms/AppBar'
import { SideBar } from '../../components/molecules/SideBar'
import { DashboardCasesServices } from '../../components/organims/DashboardCasesServices'
import { RootState } from '../../redux'

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={open} toggleDrawer={toggleDrawer} title="Dashboard" />
      <SideBar open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Copyright />
      </Box>
    </Box>
  )
}
