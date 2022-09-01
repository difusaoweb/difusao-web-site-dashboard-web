import * as React from 'react'
import { Box, Toolbar, Container } from '@mui/material'

import { Copyright } from '../../atoms/Copyright'
import { AppBar } from '../../atoms/AppBar'
import { SideBar } from '../../molecules/SideBar'
import styles from './index.module.scss'

interface PageContainerProps {
  children: JSX.Element
  title: string
}
export const PageContainer = ({ children, title }: PageContainerProps) => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Box className={styles.containerGeneral}>
        <AppBar open={open} toggleDrawer={toggleDrawer} title={title} />
        <SideBar open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900]
          }}
          className={styles.main}
        >
          <Toolbar />
          <Container maxWidth="lg" className={styles.container}>
            {children}
          </Container>
          <Copyright />
        </Box>
      </Box>
    </>
  )
}
