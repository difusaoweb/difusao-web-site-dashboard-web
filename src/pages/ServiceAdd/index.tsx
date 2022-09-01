import * as React from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'

import styles from './index.module.scss'
import { PageContainer } from '../../components/atoms/PageContainer'
import { ServicesAddFormEdit } from '../../components/ecosystems/ServicesAddFormEdit'
import { ServicesAddFormEdit2 } from '../../components/ecosystems/ServicesAddFormEdit2'
import {
  reduxServicesCreateServiceFunction,
  useAppDispatch
  // useAppSelector
} from '../../redux'

export const ServiceAddPage: React.FC = () => {
  // const { createServiceReturn } = useAppSelector(state => state.services)
  const dispatch = useAppDispatch()

  const [title, setTitle] = React.useState<string | null>(null)
  const [description, setDescription] = React.useState<string | null>(null)
  const [image, setImage] = React.useState<number | null>(null)
  const [isLoadingCreateService, setIsLoadingCreateService] =
    React.useState(false)

  async function createService() {
    if (isLoadingCreateService || !title || !description || !image) return

    setIsLoadingCreateService(true)
    await dispatch(
      reduxServicesCreateServiceFunction({ title, description, image })
    )
    setIsLoadingCreateService(false)
  }

  return (
    <PageContainer title="Adicionar">
      <>
        <Box className={styles.pageTopBar}>
          <Box className={styles.box}>
            <Typography component="h1" className={styles.titlePage}>
              Criar um novo servico
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <ServicesAddFormEdit
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
          </Grid>
          <Grid item xs={4}>
            <ServicesAddFormEdit2 image={image} setImage={setImage} />
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={createService}
              disabled={!title || !description || !image}
            >
              Criar servico
            </Button>
          </Grid>
        </Grid>
      </>
    </PageContainer>
  )
}
