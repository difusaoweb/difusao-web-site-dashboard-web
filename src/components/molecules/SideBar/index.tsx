import * as React from 'react'
import {
  Drawer as MuiDrawer,
  Toolbar,
  IconButton,
  Divider,
  List
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'

import { ListItems } from '../../atoms/ListItems'

const drawerWidth = 240

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}))

interface SideBarProps {
  open: boolean
  toggleDrawer(): void
}
export const SideBar = ({ open, toggleDrawer }: SideBarProps) => {
  const [activePage, setActivePage] = React.useState('dashboard')

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItems activePage={activePage} setActivePage={setActivePage} />
      </List>
    </Drawer>
  )
}
