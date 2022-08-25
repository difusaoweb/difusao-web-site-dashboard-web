import * as React from 'react'
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button
} from '@mui/material'

import { Copyright } from '../../components/atoms/Copyright'
import { AppBar } from '../../components/atoms/AppBar'
import { SideBar } from '../../components/molecules/SideBar'
import { CasesAddFormEdit } from '../../components/ecosystems/CasesAddFormEdit'
import { CasesAddFormEdit2 } from '../../components/ecosystems/CasesAddFormEdit2'
import {
  reduxCasesCreateCaseFunction,
  useAppDispatch
  // useAppSelector
} from '../../redux'

export const CaseAddPage: React.FC = () => {
  // const { createCaseReturn } = useAppSelector(state => state.cases)
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [title, setTitle] = React.useState<string | null>(null)
  const [description, setDescription] = React.useState<string | null>(null)
  const [image, setImage] = React.useState<number | null>(null)
  const [isLoadingCreateCase, setIsLoadingCreateCase] = React.useState(false)

  async function createCase() {
    if (isLoadingCreateCase || !title || !description || !image) return

    setIsLoadingCreateCase(true)
    await dispatch(reduxCasesCreateCaseFunction({ title, description, image }))
    setIsLoadingCreateCase(false)
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
          <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
            <Box
              sx={{ display: 'flex', alignItens: 'center', marginBottom: 5 }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{ fontWeight: 'bold' }}
                >
                  Criar um novo servico
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <CasesAddFormEdit
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                />
              </Grid>
              <Grid item xs={4}>
                <CasesAddFormEdit2 image={image} setImage={setImage} />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={createCase}
                  disabled={!title || !description || !image}
                >
                  Criar servico
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </Box>
      </Box>
    </>
  )
}
