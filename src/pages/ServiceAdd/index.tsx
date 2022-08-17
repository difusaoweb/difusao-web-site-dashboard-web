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

import { Copyright } from '../../components/atoms/Copyright'
import { AppBar } from '../../components/atoms/AppBar'
import { SideBar } from '../../components/molecules/SideBar'
import { ServicesAddFormEdit } from '../../components/ecosystems/ServicesAddFormEdit'
import { ServicesAddFormEdit2 } from '../../components/ecosystems/ServicesAddFormEdit2'
import { ServicesAddFormEdit3 } from '../../components/ecosystems/ServicesAddFormEdit3'
import { createService, useAppDispatch, useAppSelector } from '../../redux'

export const ServiceAddPage: React.FC = () => {
  const { createServiceReturn } = useAppSelector(state => state.services)
  const dispatch = useAppDispatch()

  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [name, setName] = React.useState<string | null>(null)
  const [inStock, setInStock] = React.useState<boolean>(true)
  const [price, setPrice] = React.useState<number | null>(null)
  const [description, setDescription] = React.useState<string | null>(null)
  const [images, setImages] = React.useState<string[] | null>(null)
  const [sku, setSku] = React.useState<string | null>(null)
  const [categoryId, setCategoryId] = React.useState<number | null>(null)

  const [loadingCreateService, setLoadingCreateService] = React.useState(false)
  const [alertCreateService, setAlertCreateService] = React.useState(false)

  async function addNewService() {
    if (loadingCreateService) {
      return
    }

    if (!!name && !!price) {
      setLoadingCreateService(true)
      await dispatch(
        createService({
          name,
          description,
          stock: inStock,
          images,
          sku,
          categoryId,
          price
        })
      )
      setAlertCreateService(true)
      setLoadingCreateService(false)
    }
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
                <ServicesAddFormEdit
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              </Grid>
              <Grid item xs={4}>
                <ServicesAddFormEdit2
                  inStock={inStock}
                  setInStock={setInStock}
                  sku={sku}
                  setSku={setSku}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
                <ServicesAddFormEdit3 price={price} setPrice={setPrice} />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={addNewService}
                  disabled={!(!!name && !!price)}
                >
                  Criar servico
                </Button>
              </Grid>
            </Grid>
          </Container>
          <Copyright />
        </Box>
      </Box>
      <Snackbar open={alertCreateService} autoHideDuration={500}>
        <Alert
          onClose={() => setAlertCreateService(false)}
          severity={createServiceReturn.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {createServiceReturn.success
            ? 'Serviço criado com sucesso!'
            : 'Erro ao criar o servico!'}
        </Alert>
      </Snackbar>
    </>
  )
}
