import * as React from 'react'
import { Box, Button, Toolbar, Typography, Container } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import { Copyright } from '../../components/atoms/Copyright'
import { AppBar } from '../../components/atoms/AppBar'
import { SideBar } from '../../components/molecules/SideBar'
import { AttachmentList } from '../../components/ecosystems/AttachmentList'

export const AttachmentListPage: React.FC = () => {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar open={open} toggleDrawer={toggleDrawer} title="Adicionar" />
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
          <Container maxWidth="xl" sx={{ mt: 4, pb: 4 }}>
            <Box
              sx={{ display: 'flex', alignItens: 'center', marginBottom: 5 }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: 'bold' }}
                >
                  Lista de mídias
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  href="/midias/adicionar/"
                >
                  Nova Mídia
                </Button>
              </Box>
            </Box>
            <AttachmentList />
          </Container>
          <Copyright />
        </Box>
      </Box>
    </>
  )
}
